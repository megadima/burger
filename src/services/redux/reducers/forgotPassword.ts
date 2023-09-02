import { TForgotPasswordActions } from "../actions/forgotPassword"
import { CLEAR_FORGOTPASSWORD_STORE, SEND_EMAIL_FAILED, SEND_EMAIL_REQUEST, SEND_EMAIL_SUCCESS } from "../constatns"

type TForgotPasswordState = {
  sendEmailRequest: boolean,
  sendEmailFailed: boolean,
  message: string
}

const initialState: TForgotPasswordState = {
  sendEmailRequest: false,
  sendEmailFailed: false,
  message: ''
}

export const forgotPasswordReducer = (state = initialState, action: TForgotPasswordActions): TForgotPasswordState=> {
  switch(action.type) {
    case SEND_EMAIL_REQUEST: {
      return {
        ...state,
        sendEmailRequest: true,
      }
    }
    case SEND_EMAIL_SUCCESS: {
      return {
        ...state,
        sendEmailRequest: false,
        sendEmailFailed: false,
        message: action.message,
      };
    }
    case SEND_EMAIL_FAILED: {
      return {
        ...initialState,
        sendEmailRequest: false,
        sendEmailFailed: true,
        message: action.message
      }
    }
    case CLEAR_FORGOTPASSWORD_STORE: {
      return {
        ...initialState
      }
    }
    default:
      return state
  }
}