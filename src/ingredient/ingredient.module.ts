import { Module } from '@nestjs/common';
import { IngredientController } from './ingredient.controller';

@Module({
  controllers: [IngredientController]
})
export class IngredientModule {}
