import { REFRESH_TOKEN_FAILED, REFRESH_TOKEN_SUCCESS, SEND_REFRESH_TOKEN_REQUEST } from "../actions/refreshToken.js"

const initialState = {
  refreshTokenRequest: false,
  refreshTokenFailed: false,
  message: ''
}

export const refreshTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_REFRESH_TOKEN_REQUEST: {
      return {
        ...initialState,
        refreshTokenRequest: true
      }
    }
    case REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        refreshTokenRequest: false,
        refreshTokenFailed: false,
        message: action.message
      }
    }
    case REFRESH_TOKEN_FAILED: {
      return {
        ...state,
        refreshTokenFailed: true,
        message: action.message
      }
    }
    default: 
      return state
  }
} 