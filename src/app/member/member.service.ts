import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member } from './entities/member.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class MemberService {
  constructor(@InjectModel('Member') private memberModel: Model<Member>) {}

  async create(createMemberDto: CreateMemberDto) {
    const isEmailExist = await this.memberModel.findOne({
      email: createMemberDto.email,
    });
    if (isEmailExist) {
      throw new HttpException('Email already exist', HttpStatus.BAD_REQUEST);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createMemberDto.password, salt);

    const createdMember = new this.memberModel({
      ...createMemberDto,
      password: hashedPassword,
    });

    return createdMember.save();
  }

  async findAll() {
    return await this.memberModel.find().select('-password');
  }

  async findOne(id: string) {
    return await this.memberModel.findById(id).select('-password');
  }

  async update(id: string, updateMemberDto: UpdateMemberDto) {
    return await this.memberModel
      .findByIdAndUpdate(id, updateMemberDto, { new: true })
      .select('-password');
  }

  async remove(id: string) {
    return await this.memberModel.findByIdAndUpdate(id, { isDeleted: true });
  }
}
