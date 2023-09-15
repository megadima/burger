import { orderReducer as reducer } from "./order";
import * as types from '../constatns/actionTypes';


const initialState = {
  isOrderRequest: false,
  isOrderFailed: false,
  message: "",
  res: null,
  number: null
};

describe('orders reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle SEND_ORDER_REQUEST', () => {
    expect(reducer(
      {
        ...initialState,
      },
      {
        type: types.SEND_ORDER_REQUEST
      }
    )).toEqual(
      {
        ...initialState, 
        isOrderRequest: true
      }
    )
  })

  it('should handle SEND_ORDER_SUCCESS', () => {
    expect(reducer(
      {
        ...initialState,
        isOrderRequest: true
      },
      {
        type: types.SEND_ORDER_SUCCESS,
        number: 123,
        res: 'result'
      }
    )).toEqual(
      {
        ...initialState,
        isOrderRequest: false,
        res: 'result',
        number: 123
      }
    )
  })

  it('should handle SEND_ORDER_FAILED', () => {
    expect(reducer(
      {
        ...initialState,
        isGetUserRequest: true
      },
      {
        type: types.SEND_ORDER_FAILED,
        message: 'error'
      }
    )).toEqual(
      {
        ...initialState,
        isOrderFailed: true,
        message: 'error'
      }
    )
  })
})