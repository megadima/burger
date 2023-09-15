import * as types from '../constatns/actionTypes';
import { loginReducer as reducer } from './login';

const initialState = {
  loginRequest: false,
  loginFailed: false,
  message: ''
}

describe('logout reducer', () => {
  it('should return the initial state',  () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle SEND_LOGIN_REQUEST', () => {
    expect(reducer(
      {
        ...initialState,
      },
      {
        type: types.SEND_LOGIN_REQUEST
      }
    )).toEqual(
      {
        ...initialState, 
        loginRequest: true
      }
    )
  })

  it('should handle LOGIN_SUCCESS', () => {
    expect(reducer(
      {
        ...initialState,
        loginRequest: true,
      },
      {
        type: types.LOGIN_SUCCESS,
      }
    )).toEqual(
      {
        ...initialState,
      }
    )
  })

  it('should handle LOGIN_FAILED', () => {
    expect(reducer(
      {
        ...initialState,
        loginRequest: true
      },
      {
        type: types.LOGIN_FAILED,
        message: 'Error'
      }
    )).toEqual(
      {
        ...initialState,
        loginFailed: true,
        message:'Error'
      }
    )
  })
})