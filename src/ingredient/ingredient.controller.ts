import { Controller, Get } from '@nestjs/common';
import { DishToEmissionsMapper } from '../detection/DishToEmissionsMapper';

@Controller('ingredients')
export class IngredientController {
  @Get()
  ingredients() {
    const dishToEmission = new DishToEmissionsMapper()
    return {
      ingredients: dishToEmission.getAllIngredients()
    }
  }
}
