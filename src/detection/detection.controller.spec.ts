import { Test, TestingModule } from '@nestjs/testing';
import { DetectionController } from './detection.controller';

describe('Detection Controller', () => {
  let controller: DetectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetectionController],
    }).compile();

    controller = module.get<DetectionController>(DetectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
