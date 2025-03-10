import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Perfume } from 'src/app/perfume/entities/perfume.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel('Comment') private commentModel: Model<Comment>,
    @InjectModel('Perfume') private perfumeModel: Model<Perfume>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const perfume = await this.perfumeModel.findOne({
      _id: createCommentDto.perfumeId,
      isDeleted: false,
    });
    for (const comment of perfume.comments) {
      if (comment.author.toString() === createCommentDto.authorId) {
        throw new HttpException(
          'You have already commented on this perfume',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const newComment = await this.commentModel.create({
      rating: createCommentDto.rating,
      content: createCommentDto.content,
      author: createCommentDto.authorId,
    });

    await this.perfumeModel.findByIdAndUpdate(createCommentDto.perfumeId, {
      $push: { comments: newComment._id },
    });

    return newComment;
  }

  findAll() {
    return this.commentModel.find();
  }

  findAllByPerfume(id: string) {
    return this.perfumeModel.aggregate([
      {
        $match: {
          _id: id,
        },
      },
      { $unwind: '$comments' },
      {
        $lookup: {
          from: 'comments',
          localField: 'comments',
          foreignField: '_id',
          as: 'comments',
        },
      },
      { $unwind: '$comments' },
      {
        $lookup: {
          from: 'members',
          localField: 'comments.author',
          foreignField: '_id',
          as: 'comments.author',
        },
      },
      { $unwind: '$comments.author' },
      {
        $project: {
          _id: '$comments._id',
          content: '$comments.content',
          rating: '$comments.rating',
          createdAt: '$comments.createdAt',
          'author._id': '$comments.author._id',
          'author.name': '$comments.author.name',
          'author.avatar': '$comments.author.avatar',
        },
      },
    ]);
  }

  findOne(id: string) {
    return this.commentModel.findById(id);
  }

  update(id: string, updateCommentDto: UpdateCommentDto) {
    return this.commentModel.findByIdAndUpdate(id, updateCommentDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.commentModel.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
      },
      { new: true },
    );
  }
}
