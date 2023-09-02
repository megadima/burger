import type { Middleware, MiddlewareAPI } from 'redux';
import { getCookie } from '../../../utils/cookie';
import { AppDispatch, RootState, TApplicationActions } from '../../types/redux';
import { TResponseBody, TWSOrdersResponse } from '../../types/responseTypes';
import { TWSStoreActions } from '../actions/webSocket';

export const socketMiddleware = (wsActions: TWSStoreActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TApplicationActions) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage, wsClose } = wsActions;
      if (type === wsInit) {
        socket = new WebSocket(`${action.payload}?token=${getCookie('accessToken')}`);
      }
      if (socket) {
        socket.onopen = event => {
          console.log('сокет открылся')
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData: TResponseBody<TWSOrdersResponse> = JSON.parse(data);

          dispatch({ type: onMessage, payload: parsedData });
        };

        socket.onclose = event => {
          console.log('сокет закрылся')
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