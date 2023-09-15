import { ingredientsReducer as reducer} from "./ingredients";
import * as types from '../constatns/actionTypes';

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  currentIngredient: null,
};

describe('ingredients reducer', () => {
  it('should return the initial state',  () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle SEND_INGREDIENTS_REQUEST', () => {
    expect(reducer(
      {
        ...initialState,
      },
      {
        type: types.GET_INGREDIENTS_REQUEST
      }
    )).toEqual(
      {
        ...initialState,
        ingredientsRequest: true
      }
    )
  })

  it('should handle SEND_INGREDIENTS_SUCCESS', () => {
    expect(reducer(
      {
        ...initialState,
        ingredientsRequest: true
      },
      {
        type: types.GET_INGREDIENTS_SUCCESS,
        ingredients: 'ingredients'
      }
    )).toEqual(
      {
        ...initialState,
        ingredients: 'ingredients'
      }
    )
  })
  
  it('should handle SEND_INGREDIENTS_FAILED', () => {
    expect(reducer(
      {
        ...initialState,
        ingredientsRequest: true
      },
      {
        type: types.GET_INGREDIENTS_FAILED
      }
    )).toEqual(
      {
        ...initialState,
        ingredientsFailed: true
      }
    )
  })

  it('should handle SHOW_INGREDIENT_DATA', () => {
    expect(reducer(
      {
        ...initialState,
        ingredients: ['ingredient 1', 'ingredient 2']
      },
      {
        type: types.SHOW_INGREDIENT_DATA,
        currentIngredient: 'ingredient 1'
      }
    )).toEqual(
      {
        ...initialState,
        ingredients: ['ingredient 1', 'ingredient 2'],
        currentIngredient: 'ingredient 1'
      }
    )
  })


})