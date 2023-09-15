import { TIngredientsActions } from "../actions/ingredients";
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SHOW_INGREDIENT_DATA,
} from "../constatns/actionTypes";
import { TIngredient } from "../../types/data";

export type TIngredientsState = {
  ingredients: ReadonlyArray<TIngredient>
  ingredientsRequest: boolean,
  ingredientsFailed: boolean,
  currentIngredient: TIngredient | null,
}

const initialState: TIngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  currentIngredient: null,
};

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): TIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...initialState,
        ingredients: action.ingredients,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...initialState,
        ingredientsFailed: true,
      };
    }
    case SHOW_INGREDIENT_DATA: {
      return {
        ...state,
        currentIngredient: action.currentIngredient,
      };
    }
    default: {
      return state;
    }
  }
};