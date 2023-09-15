import { TResponseBody, TWSOrdersResponse } from "../../types/responseTypes";
import {
  PROFILE_WS_CONNECTION_CLOSE,
  PROFILE_WS_CONNECTION_CLOSED,
  PROFILE_WS_CONNECTION_ERROR,
  PROFILE_WS_CONNECTION_START,
  PROFILE_WS_CONNECTION_SUCCESS,
  PROFILE_WS_GET_MESSAGE,
  PROFILE_WS_SEND_MESSAGE
} from "../constatns/wsActionTypes";

export interface IProfileWSConnectionStart {
  readonly type: typeof PROFILE_WS_CONNECTION_START;
  readonly payload: string; //url
}

export interface IProfileWSConnectionClose {
  readonly type: typeof PROFILE_WS_CONNECTION_CLOSE;
}

export interface IProfileWSConnectionSuccessAction {
  readonly type: typeof PROFILE_WS_CONNECTION_SUCCESS;
}

export interface IProfileWSConnectionErrorAction {
  readonly type: typeof PROFILE_WS_CONNECTION_ERROR;
  readonly payload: Event;
}

export interface IProfileWSConnectionClosedAction {
  readonly type: typeof PROFILE_WS_CONNECTION_CLOSED;
}

export interface IProfileWSGetMessageAction {
  readonly type: typeof PROFILE_WS_GET_MESSAGE;
  readonly payload: TResponseBody<TWSOrdersResponse>;
}

export interface IProfileWSSendMessageAction {
  readonly type: typeof PROFILE_WS_SEND_MESSAGE;
  readonly payload: { message: string };
}

export type TProfileWSActions =
  | IProfileWSConnectionStart
  | IProfileWSConnectionClose
  | IProfileWSConnectionSuccessAction
  | IProfileWSConnectionErrorAction
  | IProfileWSConnectionClosedAction
  | IProfileWSGetMessageAction
  | IProfileWSSendMessageAction;

export type TProfileWSMiddlewareActions = {
  wsInit: typeof PROFILE_WS_CONNECTION_START,
  wsClose: typeof PROFILE_WS_CONNECTION_CLOSE,
  wsSendMessage: typeof PROFILE_WS_SEND_MESSAGE,
  onOpen: typeof PROFILE_WS_CONNECTION_SUCCESS,
  onClose: typeof PROFILE_WS_CONNECTION_CLOSED,
  onError: typeof PROFILE_WS_CONNECTION_ERROR,
  onMessage: typeof PROFILE_WS_GET_MESSAGE,
};

export const profileWSMiddlewareActions: TProfileWSMiddlewareActions = {
  wsInit: PROFILE_WS_CONNECTION_START,
  wsClose: PROFILE_WS_CONNECTION_CLOSE,
  wsSendMessage: PROFILE_WS_SEND_MESSAGE,
  onOpen: PROFILE_WS_CONNECTION_SUCCESS,
  onClose: PROFILE_WS_CONNECTION_CLOSED,
  onError: PROFILE_WS_CONNECTION_ERROR,
  onMessage: PROFILE_WS_GET_MESSAGE
};
