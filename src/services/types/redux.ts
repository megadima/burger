import { Action, ActionCreator } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TCartActions } from "../redux/actions/cart";
import { TForgotPasswordActions } from "../redux/actions/forgotPassword";
import { TIngredientsActions } from "../redux/actions/ingredients";
import { TLoginActions } from "../redux/actions/login";
import { TLogoutActions } from "../redux/actions/logout";
import { TOrderActions } from "../redux/actions/order";
import { TRefreshTokenActions } from "../redux/actions/refreshToken";
import { TRegistrationActions } from "../redux/actions/registration";
import { TResetPasswordActions } from "../redux/actions/resetPassword";
import { TUserActions } from "../redux/actions/user";
import { TFeedWSActions, TFeedWSMiddlewareActions } from '../redux/actions/feedWebSocket';
import { store } from "../redux/store";
import { TProfileWSActions, TProfileWSMiddlewareActions } from '../redux/actions/profileWebSocket';

export type TWSMiddlewareActions = TFeedWSMiddlewareActions
  | TProfileWSMiddlewareActions


export type TApplicationActions = TCartActions
  | TForgotPasswordActions
  | TIngredientsActions
  | TLoginActions
  | TLogoutActions
  | TOrderActions
  | TRefreshTokenActions
  | TRegistrationActions
  | TResetPasswordActions
  | TUserActions
  | TFeedWSActions
  | TProfileWSActions
  

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, RootState, Action, TApplicationActions>
>

export type AppDispatch = ThunkDispatch<RootState, Action, TApplicationActions>;