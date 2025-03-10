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

  async findAll() {
    return await this.perfumeModel.find();
  }

  async findOne(id: string) {
    return await this.perfumeModel.findById(id);
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
