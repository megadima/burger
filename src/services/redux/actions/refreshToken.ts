import { sendRefreshToken as sendRefreshTokenRequest } from "../../../utils/burger-api";
import { setCookie } from "../../../utils/cookie";
import { REFRESH_TOKEN_FAILED, REFRESH_TOKEN_SUCCESS, SEND_REFRESH_TOKEN_REQUEST } from "../constatns/actionTypes";
import { AppDispatch, AppThunk } from "../../types/redux";
import { logout } from "./logout";
import { getUserData } from "./user";

export interface ISendRefreshTokenRequestAction {
  readonly type: typeof SEND_REFRESH_TOKEN_REQUEST;
}

export interface IRefreshTokenFailedAction {
  readonly type: typeof REFRESH_TOKEN_FAILED;
  readonly message: string;
}

export interface IRefreshTokenSuccessAction {
  readonly type: typeof REFRESH_TOKEN_SUCCESS;
}

export const sendRefreshTokenRequestAction = (): ISendRefreshTokenRequestAction => ({ type: SEND_REFRESH_TOKEN_REQUEST })
export const refreshTokenFailedAction = (message: string): IRefreshTokenFailedAction => ({ type: REFRESH_TOKEN_FAILED, message })
export const refreshTokenSuccessAction = (): IRefreshTokenSuccessAction => ({ type: REFRESH_TOKEN_SUCCESS })

export type TRefreshTokenActions = ISendRefreshTokenRequestAction
  | IRefreshTokenFailedAction
  | IRefreshTokenSuccessAction

export const refreshToken: AppThunk = () => (dispatch: AppDispatch | AppThunk) => {
  dispatch(sendRefreshTokenRequestAction())
  sendRefreshTokenRequest()
    .then(res => {
      if (res) {
        if (res.success) {
          setCookie('accessToken', res.accessToken.split('Bearer ')[1], { expires: 1200 }) //20 минут
          localStorage.setItem('refreshToken', res.refreshToken);
          dispatch(refreshTokenSuccessAction())
          dispatch(getUserData());
        } else {
          dispatch(refreshTokenFailedAction(res.message))
          dispatch(logout())
        }
      } else {
        dispatch(refreshTokenFailedAction('no response from server'))
        dispatch(logout())
      }
    })
    .catch(e => {
      dispatch(refreshTokenFailedAction('error ' + e.message))
      dispatch(logout())
    })

}