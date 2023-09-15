import { statusTypes } from '../../components/helpers/OrderDetailsStatuses'

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

export type TUser = {
  email: string;
  name: string;
}

export type TOrderStatusColors = {
  [key in keyof typeof statusTypes]: string;
}

export type TOrderStatusTexts = {
  [key in keyof typeof statusTypes]: string;
}

export type TWSOrder = {
  ingredients: ReadonlyArray<string>,
   _id: string,
   status: keyof typeof statusTypes,
   number: number,
   name: string,
   createdAt: string,
   updatedAt: string,
 }

