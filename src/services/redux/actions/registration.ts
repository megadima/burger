import { sendRegistration as sendRegistrationRequest } from "../../../utils/burger-api";
import { setCookie } from "../../../utils/cookie";
import { REGISTRATION_FAILED, REGISTRATION_SUCCESS, SEND_REGISTRATION_REQUEST } from "../constatns/actionTypes";
import { AppDispatch, AppThunk } from "../../types/redux";
import { setUserAction } from "./user";

export interface ISendRegistrationRequestAction {
  readonly type: typeof SEND_REGISTRATION_REQUEST;
}

export interface IRegistrationFailedAction {
  readonly type: typeof REGISTRATION_FAILED;
  readonly message: string;
}

export interface IRegistrationSuccessAction {
  readonly type: typeof REGISTRATION_SUCCESS;
}

export const sendRegistrationTokenRequestAction = (): ISendRegistrationRequestAction => ({ type: SEND_REGISTRATION_REQUEST })
export const registrationFailedAction = (message: string): IRegistrationFailedAction => ({ type: REGISTRATION_FAILED, message })
export const registrationSuccessAction = (): IRegistrationSuccessAction => ({ type: REGISTRATION_SUCCESS })

export type TRegistrationActions = ISendRegistrationRequestAction
  | IRegistrationFailedAction
  | IRegistrationSuccessAction

export const register: AppThunk = (email: string, password: string, name: string) => (dispatch: AppDispatch) => {
  dispatch({ type: SEND_REGISTRATION_REQUEST });
  sendRegistrationRequest(email, password, name)
    .then(res => {
      if (res && res.success) {
        dispatch(sendRegistrationTokenRequestAction());
        dispatch(setUserAction(res.user))
        setCookie('accessToken', res.accessToken.split('Bearer ')[1], { expires: 1200 }) //20 минут
        localStorage.setItem('refreshToken', res.refreshToken)
      } else {
        dispatch(registrationFailedAction(res.message))
      }
    })
    .catch(e => {
      dispatch(registrationFailedAction('error: ' + e.message))
    })
}