import { profileWSReducer as reducer } from "./profileWebSocket";
import * as types from '../constatns/wsActionTypes';

const initialState = {
  wsConnected: false,
  message: null,
};

describe('profileWS reducer', () => {
  it('should handle PROFILE_WS_CONNECTION_SUCCESS', () => {
    expect(reducer(
      {
        ...initialState
      },
      {
        type: types.PROFILE_WS_CONNECTION_SUCCESS
      }
    )).toEqual({
      ...initialState,
      wsConnected: true
    })
  })

  it('should handle PROFILE_WS_CONNECTION_ERROR', () => {
    expect(reducer(
      {
        ...initialState
      },
      {
        type: types.PROFILE_WS_CONNECTION_ERROR,
        payload: 'Error'
      }
    )).toEqual({
      ...initialState,
      error: 'Error'
    })
  })

  it('should handle PROFILE_WS_CONNECTION_CLOSED', () => {
    expect(reducer(
      {
        ...initialState,
        wsConnected: true,
        message: 'message'
      },
      {
        type: types.PROFILE_WS_CONNECTION_CLOSED,
      }
    )).toEqual({
      ...initialState,
      message: 'message'
    })
  })

  it('should handle PROFILE_WS_GET_MESSAGE', () => {
    expect(reducer(
      {
        ...initialState,
        wsConnected: true,
      },
      {
        type: types.PROFILE_WS_GET_MESSAGE,
        payload: 'message'
      }
    )).toEqual({
      ...initialState,
      wsConnected: true,
      message: 'message'
    })
  })
})