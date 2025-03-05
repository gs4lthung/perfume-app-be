import { Injectable } from '@nestjs/common';
import { CreatePerfumeDto } from './dto/create-perfume.dto';
import { UpdatePerfumeDto } from './dto/update-perfume.dto';

@Injectable()
export class PerfumeService {
  create(createPerfumeDto: CreatePerfumeDto) {
    return 'This action adds a new perfume';
  }

  findAll() {
    return `This action returns all perfume`;
  }

  findOne(id: number) {
    return `This action returns a #${id} perfume`;
  }

  update(id: number, updatePerfumeDto: UpdatePerfumeDto) {
    return `This action updates a #${id} perfume`;
  }

  remove(id: number) {
    return `This action removes a #${id} perfume`;
  }
}
