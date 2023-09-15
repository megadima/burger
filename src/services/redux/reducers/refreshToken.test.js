import * as types from '../constatns/actionTypes';
import { refreshTokenReducer as reducer } from './refreshToken';

const initialState = {
  refreshTokenRequest: false,
  refreshTokenFailed: false,
  message: ''
}

describe('refresh token reducer', () => {
  it('should return the initial state',  () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle SEND_REFRESH_TOKEN_REQUEST', () => {
    expect(reducer(
      {
        ...initialState,
      },
      {
        type: types.SEND_REFRESH_TOKEN_REQUEST
      }
    )).toEqual(
      {
        ...initialState, 
        refreshTokenRequest: true
      }
    )
  })

  it('should handle REFRESH_TOKEN_SUCCESS', () => {
    expect(reducer(
      {
        ...initialState,
        refreshTokenRequest: true
      },
      {
        type: types.REFRESH_TOKEN_SUCCESS,
      }
    )).toEqual(
      {
        ...initialState,
      }
    )
  })

  it('should handle REFRESH_TOKEN_FAILED', () => {
    expect(reducer(
      {
        ...initialState,
        refreshTokenRequest: true
      },
      {
        type: types.REFRESH_TOKEN_FAILED,
        message: 'Error'
      }
    )).toEqual(
      {
        ...initialState,
        refreshTokenFailed: true,
        message:'Error'
      }
    )
  })
})