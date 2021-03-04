export const dishes = {
  pasta: [
    {
      name: 'parmesan',
      energy: '93',
      co2: '235',
      water: '3.18',
      weight: '25',
    },
    {
      name: 'spaghetti',
      energy: '90',
      co2: '32',
      water: '0.38',
      weight: '25',
    },
    {
      name: 'olive oil',
      energy: '199',
      co2: '110',
      water: '81.05',
      weight: '25',
    },
    {
      name: 'pine nuts',
      energy: '147',
      co2: '63',
      water: '21.4',
      weight: '25',
    },
    {
      name: 'tomatoes',
      energy: '5',
      co2: '16',
      water: '0.1',
      weight: '25',
    }
  ],
  biryani: [
    {
      name: 'rice',
      energy: '88',
      co2: '65',
      water: '0.1',
      weight: '25',
    },
    {
      name: 'chicken',
      energy: '42',
      co2: '113',
      water: '1.65',
      weight: '25',
    },
    {
      name: 'butter',
      energy: '199',
      co2: '235',
      water: '3.18',
      weight: '25',
    },
    {
      name: 'Chili',
      energy: '4',
      co2: '63',
      water: '0.38',
      weight: '12',
    },
    {
      name: 'Garlic',
      energy: '30',
      co2: '25',
      water: '1.2',
      weight: '25',
    },
    {
      name: 'tomatoes',
      energy: '5',
      co2: '16',
      water: '0.1',
      weight: '25',
    },
    {
      name: 'onions',
      energy: '9',
      co2: '9.97',
      water: '0.1',
      weight: '25',
    }
  ],
  pizza: [
    {
      name: 'Rapeseed Oil',
      energy: '199',
      co2: '50',
      water: '0.15',
      weight: '25',
    },
    {
      name: 'Garlic',
      energy: '30',
      co2: '25',
      water: '1.2',
      weight: '25',
    },
    {
      name: 'Mozzarella',
      energy: '63',
      co2: '169',
      water: '2.25',
      weight: '25',
    },
    {
      name: 'Flour',
      energy: '30',
      co2: '25',
      water: '1.2',
      weight: '25',
    },
    {
      name: 'tomatoes',
      energy: '5',
      co2: '16',
      water: '0.1',
      weight: '25',
    },
    {
      name: 'Yeast',
      energy: '24',
      co2: '19',
      water: '0.1',
      weight: '25',
    }
  ],
  lasagna: [
    {
      name: 'Flour',
      energy: '30',
      co2: '25',
      water: '1.2',
      weight: '25',
    },
    {
      name: 'beef',
      energy: '26',
      co2: '422',
      water: '0.88',
      weight: '25',
    },
    {
      name: 'Mozzarella',
      energy: '63',
      co2: '169',
      water: '2.25',
      weight: '25',
    },
    {
      name: 'parmesan',
      energy: '93',
      co2: '235',
      water: '3.18',
      weight: '25',
    },
    {
      name: 'tomatoes',
      energy: '5',
      co2: '16',
      water: '0.1',
      weight: '25',
    },
    {
      name: 'ricotta',
      energy: '39',
      co2: '16',
      water: '1.05',
      weight: '25',
    },
    {
      name: 'lasagna noodles',
      energy: '93',
      co2: '37',
      water: '0.38',
      weight: '25',
    },
    ,
    {
      name: 'egg',
      energy: '30',
      co2: '68',
      water: '1.0',
      weight: '25',
    },
  ]
}

export interface DishWithIngredients {
  dishName: string,
  ingredients: Ingredient[],
}

export interface Ingredient {
  name: string,
  energy: string,
  co2: string,
  water: string,
  weight: string
}

export class DishToEmissionsMapper {
  map(dish: string): DishWithIngredients {
    const ingredients: Ingredient[] = dishes[dish]
    if (ingredients) {
      const result: DishWithIngredients =  {
        dishName: dish,
        ingredients
      }
      return result
    }

    return undefined
  }

  getAllIngredients(): Ingredient[] {
    const ingredients: Ingredient[] = []
    Object.keys(dishes).forEach(dish => {
      dishes[dish].map(ingredient => ingredients.push(ingredient))
    })

    return ingredients
  }
}
