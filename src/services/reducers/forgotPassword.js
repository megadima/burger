import { SEND_EMAIL_FAILED, SEND_EMAIL_REQUEST, SEND_EMAIL_SUCCESS } from "../actions/forgotPassword.js"

const initialState = {
  email: '',
  sendEmailRequest: false,
  sendEmailFailed: false,
  message: ''
}

export const forgotPasswordReducer = (state = initialState, action) => {
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
        email: action.email
      };
    }
    case SEND_EMAIL_FAILED: {
      return {
        ...initialState,
        sendEmailFailed: true,
        message: action.message
      }
    }
    default:
      return state
  }
}