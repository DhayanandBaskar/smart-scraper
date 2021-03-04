import { Module } from '@nestjs/common';
import { DetectionController } from './detection.controller';
import { StorageService } from './storage/storage.service';
import { DetectorService } from './detector/detector.service';

@Module({
  controllers: [DetectionController],
  providers: [StorageService, DetectorService]
})
export class DetectionModule {}
