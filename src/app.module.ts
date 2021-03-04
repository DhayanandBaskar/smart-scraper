import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DetectionModule } from './detection/detection.module';
import { UserModule } from './user/user.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { InsightModule } from './insight/insight.module';
import { SharedModule } from './shared/shared.module';
import { RepositoryModule } from './repository/repository.module';

@Module({
  imports: [DetectionModule, UserModule, IngredientModule, InsightModule, SharedModule, RepositoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
