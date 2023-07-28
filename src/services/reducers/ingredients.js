import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SHOW_INGREDIENT_DATA,
} from "../actions/ingredients";

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,

  currentIngredient: null,

  currentTab: "buns",
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: false,
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
        currentIngredient: action.item,
      };
    }
    // case SWITCH_TAB: {
    //   return {
    //     ...state,
    //     currentTab: action.tab,
    //   };
    // }
    default: {
      return state;
    }
  }
};
