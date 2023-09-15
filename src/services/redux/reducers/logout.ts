import { TLogoutActions } from "../actions/logout";
import { LOGOUT_FAILED, LOGOUT_SUCCESS, SEND_LOGOUT_REQUEST } from "../constatns/actionTypes";

export type TLogoutState = {
  sendLogoutRequest: boolean,
  logoutFailed: boolean,
  message: string
}

const initialState: TLogoutState = {
  sendLogoutRequest: false,
  logoutFailed: false,
  message: ''
}

export const logoutReducer = (state = initialState, action: TLogoutActions): TLogoutState => {
  switch(action.type) {
    case SEND_LOGOUT_REQUEST: {
      return {
        ...initialState,
        sendLogoutRequest: true
      }
    }
    case LOGOUT_SUCCESS: {
      return {
        ...initialState,
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