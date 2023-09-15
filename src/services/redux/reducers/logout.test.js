import * as types from '../constatns/actionTypes';
import { logoutReducer as reducer } from './logout';

const initialState = {
  sendLogoutRequest: false,
  logoutFailed: false,
  message: ''
}

describe('logout reducer', () => {
  it('should return the initial state',  () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle SEND_LOGOUT_REQUEST', () => {
    expect(reducer(
      {
        ...initialState,
      },
      {
        type: types.SEND_LOGOUT_REQUEST
      }
    )).toEqual(
      {
        ...initialState, 
        sendLogoutRequest: true
      }
    )
  })

  it('should handle LOGOUT_SUCCESS', () => {
    expect(reducer(
      {
        ...initialState,
        sendLogoutRequest: true,
      },
      {
        type: types.LOGOUT_SUCCESS,
        message: 'Success'
      }
    )).toEqual(
      {
        ...initialState,
        message: 'Success'
      }
    )
  })

  it('should handle LOGOUT_FAILED', () => {
    expect(reducer(
      {
        ...initialState,
        sendLogoutRequest: true
      },
      {
        type: types.LOGOUT_FAILED,
        message: 'Error'
      }
    )).toEqual(
      {
        ...initialState,
        logoutFailed: true,
        message:'Error'
      }
    )
  })
})