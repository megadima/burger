import uuid from "react-uuid";
import { ADD_TO_CART, REMOVE_FROM_CART, CHANGE_ITEM_POSITION, CLEAR_CART } from "../constatns";
import emptyImage from '../../../components/BurgerConstructor/Empty.jpg';
import { BUN } from "../../../components/helpers/IngredientCategories";
import { TCartActions } from "../actions/cart";
import { TCartElement, TIngredient } from "../../types/data";

export type TInitialBun = {
  name: 'Перетяните булочку или ингредиенты',
  price: null,
  _id: undefined,
  image_mobile: typeof emptyImage
}

export type TCartState = {
  bun: TIngredient | TInitialBun,
  filling: ReadonlyArray<TCartElement>
}

const initialState: TCartState = {
  bun: {
    _id: undefined,
    name: 'Перетяните булочку или ингредиенты',
    price: null,
    image_mobile: emptyImage,
  },
  filling: [],
};

export const cartReducer = (state = initialState, action: TCartActions): TCartState => {
  const changeItemPosition = (oldIndex: number, newIndex: number): ReadonlyArray<TCartElement> => {
    const newItems = [...state.filling];
    newItems.splice(oldIndex, 1);
    newItems.splice(newIndex, 0, state.filling[oldIndex]);
    return newItems;
  };

  switch (action.type) {
    case ADD_TO_CART: {
      if (action.item.type !== BUN) {
        return {
          ...state,
          filling: [...state.filling, { key: uuid(), item: action.item }],
        };
      } else {
        return {
          ...state,
          bun: action.item,
        }
      }
    }
    case REMOVE_FROM_CART: {
      return {
        ...state,
        filling: [...state.filling].filter((item: TCartElement) => item.key !== action.key),
      }
    }
    case CHANGE_ITEM_POSITION: {
      return {
        ...state,
        filling: changeItemPosition(action.oldIndex, action.newIndex),
      }
    }
    case CLEAR_CART: {
      return {
        ...initialState
      }
    }
    default: {
      return state;
    }
  }
}
