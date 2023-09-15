import { TResponseBody, TWSOrdersResponse } from "../../types/responseTypes";
import {
  FEED_WS_CONNECTION_CLOSE,
  FEED_WS_CONNECTION_CLOSED,
  FEED_WS_CONNECTION_ERROR,
  FEED_WS_CONNECTION_START,
  FEED_WS_CONNECTION_SUCCESS,
  FEED_WS_GET_MESSAGE,
  FEED_WS_SEND_MESSAGE
} from "../constatns/wsActionTypes";

export interface IFeedWSConnectionStart {
  readonly type: typeof FEED_WS_CONNECTION_START;
  readonly payload: string; //url
}

export interface IFeedWSConnectionClose {
  readonly type: typeof FEED_WS_CONNECTION_CLOSE;
}

export interface IFeedWSConnectionSuccessAction {
  readonly type: typeof FEED_WS_CONNECTION_SUCCESS;
}

export interface IFeedWSConnectionErrorAction {
  readonly type: typeof FEED_WS_CONNECTION_ERROR;
  readonly payload: Event;
}

export interface IFeedWSConnectionClosedAction {
  readonly type: typeof FEED_WS_CONNECTION_CLOSED;
}

export interface IFeedWSGetMessageAction {
  readonly type: typeof FEED_WS_GET_MESSAGE;
  readonly payload: TResponseBody<TWSOrdersResponse>;
}

export interface IFeedWSSendMessageAction {
  readonly type: typeof FEED_WS_SEND_MESSAGE;
  readonly payload: { message: string };
}

export type TFeedWSActions =
  | IFeedWSConnectionStart
  | IFeedWSConnectionClose
  | IFeedWSConnectionSuccessAction
  | IFeedWSConnectionErrorAction
  | IFeedWSConnectionClosedAction
  | IFeedWSGetMessageAction
  | IFeedWSSendMessageAction;

export type TFeedWSMiddlewareActions = {
  wsInit: typeof FEED_WS_CONNECTION_START,
  wsClose: typeof FEED_WS_CONNECTION_CLOSE,
  wsSendMessage: typeof FEED_WS_SEND_MESSAGE,
  onOpen: typeof FEED_WS_CONNECTION_SUCCESS,
  onClose: typeof FEED_WS_CONNECTION_CLOSED,
  onError: typeof FEED_WS_CONNECTION_ERROR,
  onMessage: typeof FEED_WS_GET_MESSAGE,
};


export const feedWSMiddlewareActions: TFeedWSMiddlewareActions = {
  wsInit: FEED_WS_CONNECTION_START,
  wsClose: FEED_WS_CONNECTION_CLOSE,
  wsSendMessage: FEED_WS_SEND_MESSAGE,
  onOpen: FEED_WS_CONNECTION_SUCCESS,
  onClose: FEED_WS_CONNECTION_CLOSED,
  onError: FEED_WS_CONNECTION_ERROR,
  onMessage: FEED_WS_GET_MESSAGE
};