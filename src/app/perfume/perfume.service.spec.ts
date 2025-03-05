import { Test, TestingModule } from '@nestjs/testing';
import { PerfumeService } from './perfume.service';

describe('PerfumeService', () => {
  let service: PerfumeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PerfumeService],
    }).compile();

    service = module.get<PerfumeService>(PerfumeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
