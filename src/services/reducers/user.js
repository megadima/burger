import { CLEAR_USER, GET_USER_FAILED, GET_USER_REQUEST, GET_USER_SUCCESS, SET_USER } from "../actions/user.js"

const initialState = {
  isGetUserRequest: false,
  isGetUserFailed: false,
  user: null,
  message: ''
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST: {
      return {
        ...initialState,
        isGetUserRequest: true,
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        isGetUserRequest: false,
        isGetUserFailed: false,
        user: action.user
      }
    }
    case GET_USER_FAILED: {
      return {
        ...initialState,
        isGetUserRequest: false,
        isGetUserFailed: true,
        message: action.message
      }
    }
    case SET_USER: {
      return {
        ...initialState,
        user: action.user
      }
    }
    case CLEAR_USER: {
      return{
        ...initialState
      }
    }
    default:
      return state
  }
}