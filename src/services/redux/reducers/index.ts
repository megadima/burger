import { combineReducers } from "redux";
import { cartReducer } from "./cart";
import { forgotPasswordReducer } from "./forgotPassword";
import { ingredientsReducer } from "./ingredients";
import { loginReducer } from "./login";
import { LogoutReducer } from "./logout";
import { orderReducer } from "./order";
import { refreshTokenReducer } from "./refreshToken";
import { registrationReducer } from "./registration";
import { resetPasswordReducer } from "./resetPassword";
import { userReducer } from "./user";
import { wsReducer } from "./webSocket";

export const rootReducer = combineReducers({
  cart: cartReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  registration: registrationReducer,
  user: userReducer,
  login: loginReducer,
  logout: LogoutReducer,
  refreshToken: refreshTokenReducer,
  wsOrders: wsReducer
});
