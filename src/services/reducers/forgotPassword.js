import { CLEAR_FORGOTPASSWORD_STORE, SEND_EMAIL_FAILED, SEND_EMAIL_REQUEST, SEND_EMAIL_SUCCESS } from "../actions/forgotPassword.js"

const initialState = {
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
      };
    }
    case SEND_EMAIL_FAILED: {
      return {
        ...initialState,
        sendEmailFailed: true,
        message: action.message
      }
    }
    case CLEAR_FORGOTPASSWORD_STORE:{
      return {
        ...initialState
      }
    }
    default:
      return state
  }
}