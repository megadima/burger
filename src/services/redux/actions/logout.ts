import { deleteCookie } from "../../../utils/cookie";
import { sendLogout as sendLogoutRequest } from "../../../utils/burger-api";
import { LOGOUT_FAILED, LOGOUT_SUCCESS, SEND_LOGOUT_REQUEST } from "../constatns/actionTypes";
import { clearUserAction } from "./user";
import { clearCartAction } from "./cart";
import { AppDispatch, AppThunk } from "../../types/redux";

export interface ISendLogoutRequestAction {
  readonly type: typeof SEND_LOGOUT_REQUEST;
}

export interface ILogoutFailedAction {
  readonly type: typeof LOGOUT_FAILED;
  readonly message: string;
}

export interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS;
  message: string
}

export const sendLogoutRequestAction = (): ISendLogoutRequestAction => ({ type: SEND_LOGOUT_REQUEST })
export const logoutFailedAction = (message: string): ILogoutFailedAction => ({ type: LOGOUT_FAILED, message })
export const logoutSuccessAction = (message: string): ILogoutSuccessAction => ({ type: LOGOUT_SUCCESS, message })

export type TLogoutActions = ISendLogoutRequestAction
  | ILogoutFailedAction
  | ILogoutSuccessAction

export const logout: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(sendLogoutRequestAction());
  const removeUserData = () => {
    dispatch(clearUserAction());
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
    dispatch(clearCartAction());
  }
  const refreshToken = localStorage.getItem('refreshToken')
  if (refreshToken) {
    sendLogoutRequest(refreshToken)
      .then(res => {
        if (res && res.success) {
          if (res.message === "Successful logout") {
            dispatch(logoutSuccessAction(res.message));
          } else {
            dispatch(logoutFailedAction(res.message));
          }
        } else {
          dispatch(logoutFailedAction('no response or response not success'));
        }
        removeUserData();
      })
      .catch(e => {
        dispatch(logoutFailedAction('error: ' + e.message))
        removeUserData();
      })
  } else {
    dispatch(logoutFailedAction('no refresh token'))
    removeUserData()
  }
}