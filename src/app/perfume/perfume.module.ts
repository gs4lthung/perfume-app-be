import { Module } from '@nestjs/common';
import { PerfumeService } from './perfume.service';
import { PerfumeController } from './perfume.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PerfumeSchema } from './entities/perfume.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Perfume', schema: PerfumeSchema }]),
  ],
  controllers: [PerfumeController],
  providers: [PerfumeService],
})
export class PerfumeModule {}
