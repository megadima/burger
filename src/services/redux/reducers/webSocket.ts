import { TResponseBody, TWSOrdersResponse } from '../../types/responseTypes';
import { TWSActions } from '../actions/webSocket';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from '../constatns/wsActionTypes';

type TWSState = {
  wsConnected: boolean;
  message: TResponseBody<TWSOrdersResponse> | null;

  error?: Event;
}

const initialState: TWSState = {
  wsConnected: false,
  message: null,
};

export const wsReducer = (state = initialState, action: TWSActions) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...initialState
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        message: action.payload,
      };

    default:
      return state;
  }
};