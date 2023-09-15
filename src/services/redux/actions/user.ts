import { getUser as getUserRequest } from "../../../utils/burger-api";
import { CLEAR_USER, GET_USER_FAILED, GET_USER_REQUEST, GET_USER_SUCCESS, SET_USER } from "../constatns/index";
import { AppDispatch, AppThunk } from "../../types/redux";
import { TUser } from "../../types/data";
import { refreshToken } from "./refreshToken";

export interface IGetUserRequestAction {
  readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED;
  readonly message: string;
}

export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
  readonly user: TUser;
}

export interface ISetUserAction {
  readonly type: typeof SET_USER;
  readonly user: TUser;
}

export interface IClearUserAction {
  readonly type: typeof CLEAR_USER;
}

export const getUserRequestAction = (): IGetUserRequestAction => ({ type: GET_USER_REQUEST })
export const getUserFailedAction = (message: string): IGetUserFailedAction => ({ type: GET_USER_FAILED, message })
export const getUserSuccessAction = (user: TUser): IGetUserSuccessAction => ({ type: GET_USER_SUCCESS, user })
export const setUserAction = (user: TUser): ISetUserAction => ({ type: SET_USER, user })
export const clearUserAction = (): IClearUserAction => ({ type: CLEAR_USER })

export type TUserActions = IGetUserRequestAction
  | IGetUserFailedAction
  | IGetUserSuccessAction
  | ISetUserAction
  | IClearUserAction

export const getUserData: AppThunk = () => (dispatch: AppDispatch | AppThunk) => {
  dispatch(getUserRequestAction());
  getUserRequest()
    .then(res => {
      if (res) {
        if (res.success) {
          dispatch(getUserSuccessAction(res.user))
        } else {
          if (res.message === "jwt malformed" || res.message === "jwt expired" || res.message === 'invalid token') {
            dispatch(getUserFailedAction(res.message))
            if (localStorage.getItem('refreshToken')) {
              dispatch(refreshToken());
            }
          }
        }
      } else {
        dispatch(getUserFailedAction('no response from server'))
      }
    })
    .catch(e => {
      dispatch(getUserFailedAction('error: ' + e.message))
      if (e.message === "jwt malformed" || e.message === "jwt expired" || e.message === 'invalid token')
        if (localStorage.getItem('refreshToken')) {
          dispatch(refreshToken());
        }
    }
    )
}