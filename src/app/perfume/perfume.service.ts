import { Injectable } from '@nestjs/common';
import { CreatePerfumeDto } from './dto/create-perfume.dto';
import { UpdatePerfumeDto } from './dto/update-perfume.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Perfume } from './entities/perfume.entity';

@Injectable()
export class PerfumeService {
  constructor(@InjectModel('Perfume') private perfumeModel: Model<Perfume>) {}

  async create(createPerfumeDto: CreatePerfumeDto) {
    return await this.perfumeModel.create(createPerfumeDto);
  }

  async findAll(query: string, filter: string) {
    if (!query && !filter) {
      query = '';
      filter = '';
    }
    return await this.perfumeModel.aggregate([
      {
        $match: {
          name: { $regex: query, $options: 'i' },
          isDeleted: false,
        },
      },
      {
        $lookup: {
          from: 'brands',
          localField: 'brand',
          foreignField: '_id',
          as: 'brand',
        },
      },
      {
        $unwind: '$brand',
      },
      {
        $match: filter
          ? {
              'brand.name': { $regex: filter, $options: 'i' },
            }
          : {},
      },
      {
        $project: {
          _id: 1,
          name: 1,
          price: 1,
          'brand.id': '$brand._id',
          'brand.name': '$brand.name',
          volume: 1,
          targetAudience: 1,
          incredients: 1,
          concentration: 1,
          uri: 1,
        },
      },
    ]);
  }

  async findOne(id: string) {
    return await this.perfumeModel
      .findOne({
        _id: id,
        isDeleted: false,
      })
      .populate('brand');
  }

  async update(id: string, updatePerfumeDto: UpdatePerfumeDto) {
    return await this.perfumeModel.findByIdAndUpdate(id, updatePerfumeDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.perfumeModel.findByIdAndUpdate(id, { isDeleted: true });
  }
}
