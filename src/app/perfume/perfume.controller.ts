import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PerfumeService } from './perfume.service';
import { CreatePerfumeDto } from './dto/create-perfume.dto';
import { UpdatePerfumeDto } from './dto/update-perfume.dto';

@Controller('perfume')
export class PerfumeController {
  constructor(private readonly perfumeService: PerfumeService) {}

  @Post()
  create(@Body() createPerfumeDto: CreatePerfumeDto) {
    return this.perfumeService.create(createPerfumeDto);
  }

  @Get()
  findAll() {
    return this.perfumeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.perfumeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePerfumeDto: UpdatePerfumeDto) {
    return this.perfumeService.update(+id, updatePerfumeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.perfumeService.remove(+id);
  }
}
