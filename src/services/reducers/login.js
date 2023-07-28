import { LOGIN_FAILED, LOGIN_SUCCESS, SEND_LOGIN_REQUEST } from "../actions/login.js"

const initialState = {
  loginRequest: false,
  loginFailed: false,
  message: ''
}

export const loginReducer = (state = initialState, action) => {
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
        loginFailed: true,
        message: action.message
      }
    }
    default:
      return state
  }
}