import { TUserActions } from "../actions/user";
import { CLEAR_USER, GET_USER_FAILED, GET_USER_REQUEST, GET_USER_SUCCESS, SET_USER } from "../constatns/actionTypes"
import { TUser } from "../../types/data";

export type TUserState = {
  isGetUserRequest: boolean;
  isGetUserFailed: boolean;
  user: TUser | null;
  message: string;
}

const initialState: TUserState = {
  isGetUserRequest: false,
  isGetUserFailed: false,
  user: null,
  message: ''
}

export const userReducer = (state = initialState, action: TUserActions): TUserState => {
  switch (action.type) {
    case GET_USER_REQUEST: {
      return {
        ...initialState,
        isGetUserRequest: true,
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...initialState,
        user: action.user
      }
    }
    case GET_USER_FAILED: {
      return {
        ...initialState,
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
      return {
        ...initialState,
        message: state.message
      }
    }
    default:
      return state
  }
}