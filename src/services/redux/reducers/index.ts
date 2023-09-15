import { combineReducers } from "redux";
import { cartReducer } from "./cart";
import { forgotPasswordReducer } from "./forgotPassword";
import { ingredientsReducer } from "./ingredients";
import { loginReducer } from "./login";
import { logoutReducer } from "./logout";
import { orderReducer } from "./order";
import { refreshTokenReducer } from "./refreshToken";
import { registrationReducer } from "./registration";
import { resetPasswordReducer } from "./resetPassword";
import { userReducer } from "./user";
import { feedWSReducer } from "./feedWebSocket";
import { profileWSReducer } from "./profileWebSocket";

export const rootReducer = combineReducers({
  cart: cartReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  registration: registrationReducer,
  user: userReducer,
  login: loginReducer,
  logout: logoutReducer,
  refreshToken: refreshTokenReducer,
  feedWSOrders: feedWSReducer,
  profileWSOrders: profileWSReducer
});
