import type { Middleware, MiddlewareAPI } from 'redux';
import { getCookie } from '../../../utils/cookie';
import { AppDispatch, RootState, TApplicationActions, TWSMiddlewareActions } from '../../types/redux';
import { TResponseBody, TWSOrdersResponse } from '../../types/responseTypes';
import { refreshToken } from '../actions/refreshToken';

export const socketMiddleware = (wsActions: TWSMiddlewareActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TApplicationActions) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage, wsClose } = wsActions;

      if (type === wsInit) {
        const url = action.payload
        socket = new WebSocket(url);
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData: TResponseBody<TWSOrdersResponse> = JSON.parse(data);
          dispatch({ type: onMessage, payload: parsedData });
          if (!parsedData.success && parsedData.message === "Invalid or missing token") {
            dispatch(refreshToken());
          }
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          const payload = action.payload;
          const message = { ...payload, token: getCookie('accessToken') };
          socket.send(JSON.stringify(message));
        }

        if (type === wsClose) {
          socket.close()
        }
      }

      next(action);
    };
  }) as Middleware;
};