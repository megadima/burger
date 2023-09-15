import * as types from '../constatns/actionTypes';
import { forgotPasswordReducer as reducer } from './forgotPassword';

const initialState = {
  sendEmailRequest: false,
  sendEmailFailed: false,
  message: ''
}

describe('forgot password reducer', () => {
  it('should return the initial state',  () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle SEND_EMAIL_REQUEST', () => {
    expect(reducer(
      {
        ...initialState,
      },
      {
        type: types.SEND_EMAIL_REQUEST
      }
    )).toEqual(
      {
        ...initialState, 
        sendEmailRequest: true
      }
    )
  })

  it('should handle SEND_EMAIL_SUCCESS', () => {
    expect(reducer(
      {
        ...initialState,
        sendEmailRequest: true
      },
      {
        type: types.SEND_EMAIL_SUCCESS,
        message: 'Success'
      }
    )).toEqual(
      {
        ...initialState,
        message: 'Success'
      }
    )
  })

  it('should handle SEND_EMAIL_FAILED', () => {
    expect(reducer(
      {
        ...initialState,
        sendEmailRequest: true
      },
      {
        type: types.SEND_EMAIL_FAILED,
        message: 'Error'
      }
    )).toEqual(
      {
        ...initialState,
        sendEmailFailed: true,
        message:'Error'
      }
    )
  })
})