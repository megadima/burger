import { TResetPasswordActions } from "../actions/resetPassword";
import { RESET_PASSWORD_FAILED, RESET_PASSWORD_SUCCESS, SEND_RESET_PASSWORD_REQUEST } from "../constatns";

export type TResetPasswordState = {
  sendResetPasswordRequest: boolean,
  resetPasswordFailed: boolean,
  message: string
}

const initialState: TResetPasswordState = {
  sendResetPasswordRequest: false,
  resetPasswordFailed: false,
  message: ''
}

export const resetPasswordReducer = (state = initialState, action: TResetPasswordActions): TResetPasswordState => {
  switch(action.type) {
    case SEND_RESET_PASSWORD_REQUEST: {
      return {
        ...initialState,
        sendResetPasswordRequest: true
      }
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        sendResetPasswordRequest: false,
        resetPasswordFailed: false,
        message: action.message
      }
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...initialState,
        sendResetPasswordRequest: false,
        resetPasswordFailed: true,
        message: action.message
      }
    }
    default:
      return state
  }
}