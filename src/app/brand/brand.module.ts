import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandSchema } from './entities/brand.entity';
import { PerfumeSchema } from '../perfume/entities/perfume.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Brand', schema: BrandSchema }]),
    MongooseModule.forFeature([{ name: 'Perfume', schema: PerfumeSchema }]),
  ],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}
