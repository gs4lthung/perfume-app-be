import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(@InjectModel('Brand') private brandModel: Model<Brand>) {}

  create(createBrandDto: CreateBrandDto) {
    const isBrandExist = this.brandModel.findOne({ name: createBrandDto.name });
    if (isBrandExist) {
      throw new HttpException('Brand already exist', HttpStatus.BAD_REQUEST);
    }

    const createdBrand = new this.brandModel(createBrandDto);
    return createdBrand.save();
  }

  findAll() {
    return this.brandModel.find();
  }

  findOne(id: string) {
    return this.brandModel.findById(id);
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    const isBrandExist = this.brandModel.findOne({ name: updateBrandDto.name });
    if (isBrandExist) {
      throw new HttpException('Brand already exist', HttpStatus.BAD_REQUEST);
    }

    return this.brandModel.findByIdAndUpdate(id, updateBrandDto, { new: true });
  }

  remove(id: string) {
    return this.brandModel.findByIdAndUpdate(id, { isDeleted: true });
  }
}
