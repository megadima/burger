import { TRefreshTokenActions } from "../actions/refreshToken"
import { REFRESH_TOKEN_FAILED, REFRESH_TOKEN_SUCCESS, SEND_REFRESH_TOKEN_REQUEST } from "../constatns"

export type TRefreshTokenState = {
  refreshTokenRequest: boolean,
  refreshTokenFailed: boolean,
  message: string
}

const initialState: TRefreshTokenState = {
  refreshTokenRequest: false,
  refreshTokenFailed: false,
  message: ''
}

export const refreshTokenReducer = (state = initialState, action: TRefreshTokenActions): TRefreshTokenState => {
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