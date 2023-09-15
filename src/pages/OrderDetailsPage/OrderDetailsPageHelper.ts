import { TIngredient } from "../../services/types/data";

type TListIngredientData = {
  image: string,
  title: string,
  price: number,
  amount: number,
}

type TCombinedListIngredientsData = { [id: string]: TListIngredientData | undefined };

export const getIngredientsDataForList = (ingredientsIds: ReadonlyArray<string>, allIngredients: ReadonlyArray<TIngredient>) => {
  let totalPrice = 0;
  const data: TCombinedListIngredientsData = ingredientsIds.reduce((acc: TCombinedListIngredientsData, orderIngredientId) => {
    if (acc[orderIngredientId]?.amount) {
      acc[orderIngredientId]!.amount += 1;
      totalPrice += acc[orderIngredientId]!.price
    } else {
      const ingredient = allIngredients.find((storeIngredient) => storeIngredient._id === orderIngredientId)
      if (ingredient) {
        acc[orderIngredientId] = {
          image: ingredient.image,
          title: ingredient.name,
          price: ingredient.price,
          amount: 1,
        }
        totalPrice += ingredient.price;
      } else {
        acc[orderIngredientId] = undefined
      }
    }
    return acc
  }, {})
  return {
    listIngredientsData: data,
    totalPrice: totalPrice,
  }
}