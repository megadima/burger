import * as types from '../constatns/actionTypes';
import { registrationReducer as reducer } from './registration';

const initialState = {
  registrationRequest: false,
  registrationFailed: false,
  message: ''
}

describe('reset password reducer', () => {
  it('should return the initial state',  () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle SEND_REGISTRATION_REQUEST', () => {
    expect(reducer(
      {
        ...initialState,
      },
      {
        type: types.SEND_REGISTRATION_REQUEST
      }
    )).toEqual(
      {
        ...initialState, 
        registrationRequest: true
      }
    )
  })

  it('should handle REGISTRATION_SUCCESS', () => {
    expect(reducer(
      {
        ...initialState,
        registrationRequest: true
      },
      {
        type: types.REGISTRATION_SUCCESS,
      }
    )).toEqual(
      {
        ...initialState,
      }
    )
  })

  it('should handle REGISTRATION_FAILED', () => {
    expect(reducer(
      {
        ...initialState,
        registrationRequest: true
      },
      {
        type: types.REGISTRATION_FAILED,
        message: 'Error'
      }
    )).toEqual(
      {
        ...initialState,
        registrationFailed: true,
        message:'Error'
      }
    )
  })
})