import { TResponseBody, TWSOrdersResponse } from '../../types/responseTypes';
import { TProfileWSActions } from '../actions/profileWebSocket';
import { PROFILE_WS_CONNECTION_CLOSED, PROFILE_WS_CONNECTION_ERROR, PROFILE_WS_CONNECTION_SUCCESS, PROFILE_WS_GET_MESSAGE } from '../constatns/wsActionTypes';

type TWSState = {
  wsConnected: boolean;
  message: TResponseBody<TWSOrdersResponse> | null;

  error?: Event;
}

const initialState: TWSState = {
  wsConnected: false,
  message: null,
};

export const profileWSReducer = (state = initialState, action: TProfileWSActions) => {
  switch (action.type) {
    case PROFILE_WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true
      };

    case PROFILE_WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };

    case PROFILE_WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };

    case PROFILE_WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        message: action.payload,
      };

    default:
      return state;
  }
};