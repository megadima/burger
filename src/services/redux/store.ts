import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "./reducers";
import thunk from "redux-thunk";
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from "redux-persist";
import { socketMiddleware } from "./middleware/webSocketMiddleware";
import { feedWSMiddlewareActions } from "./actions/feedWebSocket";
import { profileWSMiddlewareActions } from "./actions/profileWebSocket";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(
  thunk,
  socketMiddleware(feedWSMiddlewareActions),
  socketMiddleware(profileWSMiddlewareActions)
)));

export const persistor = persistStore(store)