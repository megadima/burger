import { LOGOUT_FAILED, LOGOUT_SUCCESS, SEND_LOGOUT_REQUEST } from "../actions/logout.js";

const initialState = {
  sendLogoutRequest: false,
  logoutFailed: false,
  message: ''
}

export const LogoutReducer = (state = initialState, action) => {
  switch(action.type) {
    case SEND_LOGOUT_REQUEST: {
      return {
        ...initialState,
        sendLogoutRequest: true
      }
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        sendLogoutRequest: false,
        logoutFailed: false,
        message: action.message,
      }
    }
    case LOGOUT_FAILED: {
      return {
        ...initialState,
        logoutFailed: true,
        message: action.message
      }
    }
    default:
      return state
  }
}