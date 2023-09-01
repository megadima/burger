import { TResponseBody, TWSOrdersResponse } from "../../types/responseTypes";
import { WS_CONNECTION_CLOSE, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE, WS_SEND_MESSAGE } from "../constatns/wsActionTypes";

export interface IWSConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string; //url
}

export interface IWSConnectionClose {
  readonly type: typeof WS_CONNECTION_CLOSE;
}

export interface IWSConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWSConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: Event;
}

export interface IWSConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWSGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: TResponseBody<TWSOrdersResponse>;
}

export interface IWSSendMessageAction {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: {message: string};
}

export type TWSActions =
  | IWSConnectionStart
  | IWSConnectionClose
  | IWSConnectionSuccessAction
  | IWSConnectionErrorAction
  | IWSConnectionClosedAction
  | IWSGetMessageAction
  | IWSSendMessageAction;

  export type TWSStoreActions = {
    wsInit: typeof  WS_CONNECTION_START,
    wsClose: typeof WS_CONNECTION_CLOSE,
    wsSendMessage: typeof  WS_SEND_MESSAGE,
    onOpen: typeof  WS_CONNECTION_SUCCESS,
    onClose: typeof WS_CONNECTION_CLOSED,
    onError: typeof  WS_CONNECTION_ERROR,
    onMessage: typeof  WS_GET_MESSAGE,
  };
  