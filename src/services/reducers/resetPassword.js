import { RESET_PASSWORD_FAILED, RESET_PASSWORD_SUCCESS, SEND_RESET_PASSWORD_REQUEST } from "../actions/resetPassword.js";

const initialState = {
  sendResetPasswordRequest: false,
  resetPasswordFailed: false,
  message: ''
}

export const resetPasswordReducer = (state = initialState, action) => {
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
        resetPasswordFailed: true,
        message: action.message
      }
    }
    default:
      return state
  }
}