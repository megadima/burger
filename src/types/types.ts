type TIngredientCategory =  'bun' | 'sauce' | 'main'

export type TIngredient = {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: TIngredientCategory;
  __v: number;
  _id: string;
}

export type TCartElement = {
  key: string;
  item: TIngredient;
}