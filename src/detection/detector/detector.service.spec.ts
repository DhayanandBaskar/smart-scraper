import { Test, TestingModule } from '@nestjs/testing';
import { DetectorService } from './detector.service';

describe('DetectorService', () => {
  let service: DetectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetectorService],
    }).compile();

    service = module.get<DetectorService>(DetectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
