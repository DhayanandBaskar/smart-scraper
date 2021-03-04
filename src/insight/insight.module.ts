import { Module } from '@nestjs/common';
import { InsightController } from './insight.controller';

@Module({
  controllers: [InsightController]
})
export class InsightModule {}
