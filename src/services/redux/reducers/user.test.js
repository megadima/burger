import { userReducer as reducer } from "./user"
import * as types from '../constatns/actionTypes';

const initialState = {
  isGetUserRequest: false,
  isGetUserFailed: false,
  user: null,
  message: ''
}

const message = 'error'

const user = {
  name: 'asd',
  email: 'asd@asd.asd'
}

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle GET_USER_REQUEST', () => {
    expect(reducer(
      {
        ...initialState,
      },
      {
        type: types.GET_USER_REQUEST
      }
    )).toEqual(
      {
        ...initialState, 
        isGetUserRequest: true
      }
    )
  })

  it('should handle GET_USER_SUCCESS', () => {
    expect(reducer(
      {
        ...initialState,
        isGetUserRequest: true
      },
      {
        type: types.GET_USER_SUCCESS,
        user: user
      }
    )).toEqual(
      {
        ...initialState,
        isGetUserRequest: false,
        user: user
      }
    )
  })

  it('should handle GET_USER_FAILED', () => {
    expect(reducer(
      {
        ...initialState,
        isGetUserRequest: true
      },
      {
        type: types.GET_USER_FAILED,
        message: message
      }
    )).toEqual(
      {
        ...initialState,
        isGetUserFailed: true,
        message: message
      }
    )
  })

  it('should handle SET_USER', () => {
    expect(reducer(
      {
        ...initialState,
      },
      {
        type: types.SET_USER,
        user: user
      }
    )).toEqual(
      {
        ...initialState,
        user: user
      }
    )
  })

  it('should handle CLEAR_USER', () => {
    expect(reducer(
      {
        ...initialState,
        user: user
      },
      {
        type: types.CLEAR_USER,
      }
    )).toEqual(
      {
        ...initialState,
      }
    )
  })
})