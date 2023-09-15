import { TLoginActions } from "../actions/login";
import { LOGIN_FAILED, LOGIN_SUCCESS, SEND_LOGIN_REQUEST } from "../constatns/actionTypes"

export type TLoginState = {
  loginRequest: boolean;
  loginFailed: boolean;
  message: string
}

const initialState: TLoginState = {
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
        ...initialState,
      }
    }
    case LOGIN_FAILED: {
      return {
        ...initialState,
        loginFailed: true,
        message: action.message
      }
    }
    default:
      return state
  }
}