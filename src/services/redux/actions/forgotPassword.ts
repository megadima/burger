import { sendEmailForResetPassword as sendEmailRequest } from "../../../utils/burger-api";
import { CLEAR_FORGOTPASSWORD_STORE, SEND_EMAIL_FAILED, SEND_EMAIL_REQUEST, SEND_EMAIL_SUCCESS } from "../constatns";
import { AppDispatch, AppThunk } from "../../types/redux";

export interface ISendEmailRequestAction {
  readonly type: typeof SEND_EMAIL_REQUEST;
}

export interface ISendEmailFailedAction {
  readonly type: typeof SEND_EMAIL_FAILED;
  readonly message: string;
}

export interface ISendEmailSuccessAction {
  readonly type: typeof SEND_EMAIL_SUCCESS;
  readonly message: string;
}

export interface IClearForgotPasswordStoreAction {
  readonly type: typeof CLEAR_FORGOTPASSWORD_STORE;
}

export const sendEmailRequestAction = (): ISendEmailRequestAction => ({ type: SEND_EMAIL_REQUEST })
export const sendEmailFailedAction = (message: string): ISendEmailFailedAction => ({ type: SEND_EMAIL_FAILED, message })
export const sendEmailSuccessAction = (message: string): ISendEmailSuccessAction => ({ type: SEND_EMAIL_SUCCESS, message })
export const clearForgotPasswordStoreAction = (): IClearForgotPasswordStoreAction => ({ type: CLEAR_FORGOTPASSWORD_STORE })

export type TForgotPasswordActions = ISendEmailRequestAction
  | ISendEmailFailedAction
  | ISendEmailSuccessAction
  | IClearForgotPasswordStoreAction


export const sendEmail: AppThunk = (email: string) => (dispatch: AppDispatch) => {
  dispatch(sendEmailRequestAction())
  sendEmailRequest(email)
    .then(res => {
      if (res && res.success) {
        if (res.message === 'Reset email sent') {
          dispatch(sendEmailSuccessAction(res.message))
        } else {
          dispatch(sendEmailFailedAction(res.message))
        }
      } else {
        dispatch(sendEmailFailedAction('no response or response not success'))
      }
    })
    .catch(e => {
      dispatch(sendEmailFailedAction('error ' + e.message))
    })
}