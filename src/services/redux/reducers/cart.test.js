import { cartReducer as reducer } from "./cart";
import * as types from '../constatns/actionTypes';
import emptyImage from '../../../components/BurgerConstructor/Empty.jpg';
import uuid from 'uuid';

jest.mock('uuid', () => ({ v4: () => '00000000-0000-0000-0000-000000000000' }));

const ingredientsSameFields = {
  name: 'asd',
  proteins: 123,
  fat: 123,
  carbohydrates: 123,
  calories: 123,
  price: 123,
  image: 'asd',
  image_mobile: 'asd',
  image_large: 'asd',
  __v: 123,
}

const mockedFillingItem1 = {
  key: 'f1',
  item: {
    ...ingredientsSameFields,
    _id: "filling1",
    type: 'filling',
  }
};

const mockedFillingItem2 = {
  key: 'f2',
  item: {
    ...ingredientsSameFields,
    _id: "filling2",
    type: 'filling',
  }
};

const mockedBun1 = {
  ...ingredientsSameFields,
  _id: "bun1",
  type: 'bun',
}

const initialState = {
  bun: {
    _id: undefined,
    name: 'Перетяните булочку или ингредиенты',
    price: null,
    image_mobile: emptyImage,
  },
  filling: []
}

const mockedBun2 = { ...mockedBun1, _id: 'bun2' }

describe('cart reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle ADD_TO_CART with FILLING', () => {
    expect(reducer(
      {
        bun: mockedBun1,
        filling: [mockedFillingItem1],
      },
      {
        type: types.ADD_TO_CART,
        item: mockedFillingItem2.item
      }
    )).toEqual(
      {
        bun: mockedBun1,
        filling: [
          mockedFillingItem1,
          {
            ...mockedFillingItem2,
            key: uuid.v4()
          }
        ]
      }
    )
  })

  it('should handle ADD_TO_CART with BUN', () => {
    expect(reducer(
      {
        bun: mockedBun1,
        filling: []
      },
      {
        type: types.ADD_TO_CART,
        item: mockedBun2
      }
    )).toEqual(
      {
        bun: mockedBun2,
        filling: []
      }
    )
  })

  it('should handle REMOVE_FROM_CART', () => {
    expect(reducer(
      {
        bun: mockedBun1,
        filling: [mockedFillingItem1, mockedFillingItem2]
      },
      {
        type: types.REMOVE_FROM_CART,
        key: 'f2'
      }
    )).toEqual({
      bun: mockedBun1,
      filling: [mockedFillingItem1]
    })
  })

  it('should handle CHANGE_ITEM_POSITION', () => {
    expect(reducer(
      {
        bun: mockedBun1,
        filling: [mockedFillingItem1, mockedFillingItem2]
      },
      {
        type: types.CHANGE_ITEM_POSITION,
        oldIndex: 1,
        newIndex: 0
      }
    )).toEqual({
      bun: mockedBun1,
      filling: [mockedFillingItem2, mockedFillingItem1]
    })
  })

  it('should handle CLEAR_CART', () => {
    expect(reducer(
      {
        bun: mockedBun1,
        filling: [mockedFillingItem1, mockedFillingItem2]
      },
      {
        type: types.CLEAR_CART,
      }
    )).toEqual(initialState)
  })
})