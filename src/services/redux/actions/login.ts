import { sendLogin as sendLoginRequest } from "../../../utils/burger-api";
import { setCookie } from "../../../utils/cookie";
import { LOGIN_FAILED, LOGIN_SUCCESS, SEND_LOGIN_REQUEST } from "../constatns/actionTypes";
import { AppDispatch, AppThunk } from "../../types/redux";
import { setUserAction } from "./user";

export interface ISendLoginRequestAction {
  readonly type: typeof SEND_LOGIN_REQUEST;
}

export interface ILoginFailedAction {
  readonly type: typeof LOGIN_FAILED;
  readonly message: string;
}

export interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
  message: string
}

export const sendLoginRequestAction = (): ISendLoginRequestAction => ({ type: SEND_LOGIN_REQUEST })
export const loginFailedAction = (message: string): ILoginFailedAction => ({ type: LOGIN_FAILED, message })
export const loginSuccessAction = (message: string): ILoginSuccessAction => ({ type: LOGIN_SUCCESS, message })

export type TLoginActions = ISendLoginRequestAction
  | ILoginFailedAction
  | ILoginSuccessAction

export const login: AppThunk<Promise<boolean>> = (email: string, password: string) => (dispatch: AppDispatch) => {
  dispatch(sendLoginRequestAction());
  return sendLoginRequest(email, password)
    .then(res => {
      if (res) {
        if (res.success) {
          dispatch(setUserAction(res.user))
          setCookie('accessToken', res.accessToken.split('Bearer ')[1], { expires: 1200 }) //20 минут
          localStorage.setItem('refreshToken', res.refreshToken);
          dispatch(loginSuccessAction('login success'));
          return true
        } else {
          dispatch(loginFailedAction(res.message))
          return false
        }
      } else {
        dispatch(loginFailedAction('no response from server'))
        return false
      }
    })
    .catch(e => {
      dispatch(loginFailedAction('error: ' + e.message))
      return false
    })
}