import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand } from './entities/brand.entity';
import { Perfume } from '../perfume/entities/perfume.entity';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel('Brand') private brandModel: Model<Brand>,
    @InjectModel('Perfume') private perfumeModel: Model<Perfume>,
  ) {}

  async create(createBrandDto: CreateBrandDto) {
    const isBrandExist = await this.brandModel.findOne({
      name: createBrandDto.name,
    });
    if (isBrandExist) {
      throw new HttpException('Brand already exist', HttpStatus.BAD_REQUEST);
    }

    const createdBrand = new this.brandModel(createBrandDto);
    return createdBrand.save();
  }

  async findAll() {
    return await this.brandModel.find({ isDeleted: false });
  }

  async findOne(id: string) {
    return await this.brandModel.findById(id);
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    const isBrandExist = await this.brandModel.findOne({
      _id: { $ne: id },
      name: updateBrandDto.name,
    });
    if (isBrandExist) {
      throw new HttpException('Brand already exist', HttpStatus.BAD_REQUEST);
    }

    return await this.brandModel.findByIdAndUpdate(id, updateBrandDto, {
      new: true,
    });
  }

  async remove(id: string) {
    const brandToDelete = await this.brandModel.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    const perfumesToDelete = await this.perfumeModel.find({ brand: id });
    perfumesToDelete.forEach(async (perfume) => {
      await this.perfumeModel.findByIdAndUpdate(perfume._id, {
        isDeleted: true,
      });
    });

    return brandToDelete;
  }
}
