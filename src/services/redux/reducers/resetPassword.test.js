import * as types from '../constatns/actionTypes';
import { resetPasswordReducer as reducer } from './resetPassword';

const initialState = {
  sendResetPasswordRequest: false,
  resetPasswordFailed: false,
  message: ''
}

describe('reset password reducer', () => {
  it('should return the initial state',  () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle SEND_RESET_PASSWORD_REQUEST', () => {
    expect(reducer(
      {
        ...initialState,
      },
      {
        type: types.SEND_RESET_PASSWORD_REQUEST
      }
    )).toEqual(
      {
        ...initialState, 
        sendResetPasswordRequest: true
      }
    )
  })

  it('should handle RESET_PASSWORD_SUCCESS', () => {
    expect(reducer(
      {
        ...initialState,
        sendResetPasswordRequest: true,
      },
      {
        type: types.RESET_PASSWORD_SUCCESS,
        message: 'Success'
      }
    )).toEqual(
      {
        ...initialState,
        message: 'Success'
      }
    )
  })

  it('should handle RESET_PASSWORD_FAILED', () => {
    expect(reducer(
      {
        ...initialState,
        sendResetPasswordRequest: true
      },
      {
        type: types.RESET_PASSWORD_FAILED,
        message: 'Error'
      }
    )).toEqual(
      {
        ...initialState,
        resetPasswordFailed: true,
        message: 'Error'
      }
    )
  })
})