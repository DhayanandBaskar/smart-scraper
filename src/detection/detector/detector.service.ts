import { Injectable } from '@nestjs/common';
import { InterceptedFile } from '../models/InterceptedFile.model';
import { ingredients } from '../../ingredient/data/ingredients';

@Injectable()
export class DetectorService {
  async process(image: InterceptedFile) {
    return {
      dishName: 'Biryani',
      ingredients: [{
        name: 'almonds',
        ...ingredients.almonds
      }, {
        name: 'chicken',
        ...ingredients.chicken
      }, {
        name: 'rice',
        ...ingredients.rice
      }]
    }
  }
}
