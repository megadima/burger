import { sendResetPassword as sendResetPasswordRequest } from "../../../utils/burger-api";
import { RESET_PASSWORD_FAILED, RESET_PASSWORD_SUCCESS, SEND_RESET_PASSWORD_REQUEST } from "../constatns/actionTypes";
import { AppDispatch, AppThunk } from "../../types/redux";

export interface ISendResetPasswordRequestAction {
  readonly type: typeof SEND_RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordFailedAction {
  readonly type: typeof RESET_PASSWORD_FAILED;
  readonly message: string;
}

export interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
  readonly message: string;
}

export const sendResetPasswordRequestAction = (): ISendResetPasswordRequestAction => ({ type: SEND_RESET_PASSWORD_REQUEST })
export const resetPasswordFailedAction = (message: string): IResetPasswordFailedAction => ({ type: RESET_PASSWORD_FAILED, message })
export const resetPasswordSuccessAction = (message: string): IResetPasswordSuccessAction => ({ type: RESET_PASSWORD_SUCCESS, message })

export type TResetPasswordActions = ISendResetPasswordRequestAction
  | IResetPasswordFailedAction
  | IResetPasswordSuccessAction


export const sendResetPassword: AppThunk = (password: string, verificationCode: string) => (dispatch: AppDispatch) => {
  dispatch(sendResetPasswordRequestAction());
  sendResetPasswordRequest(password, verificationCode)
    //здесь используется токен из письма.
    .then(res => {
      if (res && res.success) {
        if (res.message === "Password successfully reset") {
          dispatch(resetPasswordSuccessAction(res.message));
        } else {
          dispatch(resetPasswordFailedAction(res.message));
        }
      } else {
        dispatch(resetPasswordFailedAction('no response or response not success'))
      }
    })
    .catch(e => {
      dispatch(resetPasswordFailedAction('error: ' + e.message))
    })
}