import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberModule } from './member/member.module';
import { BrandModule } from './brand/brand.module';
import { PerfumeModule } from './perfume/perfume.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/perfume-app'),
    MemberModule,
    BrandModule,
    PerfumeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
