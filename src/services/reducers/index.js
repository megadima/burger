import { combineReducers } from "redux";
import { cartReducer } from "./cart";
import { forgotPasswordReducer } from "./forgotPassword.js";
import { ingredientsReducer } from "./ingredients";
import { loginReducer } from "./login.js";
import { LogoutReducer } from "./logout.js";
import { orderReducer } from "./order";
import { refreshTokenReducer } from "./refreshToken.js";
import { registrationReducer } from "./registration.js";
import { resetPasswordReducer } from "./resetPassword.js";
import { userReducer } from "./user.js";

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
  refreshToken: refreshTokenReducer
});
