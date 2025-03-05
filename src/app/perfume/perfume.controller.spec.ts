import { Test, TestingModule } from '@nestjs/testing';
import { PerfumeController } from './perfume.controller';
import { PerfumeService } from './perfume.service';

describe('PerfumeController', () => {
  let controller: PerfumeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerfumeController],
      providers: [PerfumeService],
    }).compile();

    controller = module.get<PerfumeController>(PerfumeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
