import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PerfumeService } from './perfume.service';
import { CreatePerfumeDto } from './dto/create-perfume.dto';
import { UpdatePerfumeDto } from './dto/update-perfume.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from '../member/admin.guard';

@Controller('perfume')
export class PerfumeController {
  constructor(private readonly perfumeService: PerfumeService) {}

  @UseGuards(AuthGuard, AdminGuard)
  @Post()
  create(@Body() createPerfumeDto: CreatePerfumeDto) {
    return this.perfumeService.create(createPerfumeDto);
  }

  @Get()
  findAll(@Req() req: { query: { query: string; filter: string } }) {
    return this.perfumeService.findAll(req.query.query, req.query.filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.perfumeService.findOne(id);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePerfumeDto: UpdatePerfumeDto) {
    return this.perfumeService.update(id, updatePerfumeDto);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.perfumeService.remove(id);
  }
}
