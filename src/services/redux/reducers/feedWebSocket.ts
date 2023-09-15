import { TResponseBody, TWSOrdersResponse } from '../../types/responseTypes';
import { TFeedWSActions } from '../actions/feedWebSocket';
import { FEED_WS_CONNECTION_CLOSED, FEED_WS_CONNECTION_ERROR, FEED_WS_CONNECTION_SUCCESS,FEED_WS_GET_MESSAGE } from '../constatns/wsActionTypes';

type TWSState = {
  wsConnected: boolean;
  message: TResponseBody<TWSOrdersResponse> | null;

  error?: Event;
}

const initialState: TWSState = {
  wsConnected: false,
  message: null,
};

export const feedWSReducer = (state = initialState, action: TFeedWSActions) => {
  switch (action.type) {
    case FEED_WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true
      };

    case FEED_WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };

    case FEED_WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };

    case FEED_WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        message: action.payload,
      };

    default:
      return state;
  }
};