import { TLoginActions } from "../actions/login";
import { LOGIN_FAILED, LOGIN_SUCCESS, SEND_LOGIN_REQUEST } from "../constatns"

export type TLoginState = {
  loginRequest: boolean;
  loginFailed: boolean;
  message: string
}

const initialState = {
  loginRequest: false,
  loginFailed: false,
  message: ''
}

export const loginReducer = (state = initialState, action: TLoginActions): TLoginState => {
  switch (action.type) {
    case SEND_LOGIN_REQUEST: {
      return {
        ...initialState,
        loginRequest: true
      }
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: false,
      }
    }
    case LOGIN_FAILED: {
      return {
        ...initialState,
        loginRequest: false,
        loginFailed: true,
        message: action.message
      }
    }
    default:
      return state
  }
}