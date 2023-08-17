import { getUser as getUserRequest } from "../../utils/burger-api.js";
import { getCookie } from "../../utils/cookie.js";
import { refreshToken } from "./refreshToken.js";

export const GET_USER_REQUEST = 'SEND_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';

export const getUserData = () => dispatch => {
  dispatch({
    type: GET_USER_REQUEST
  });
  getUserRequest()
  .then(res => {
    if (res) {
      if (res.success) {
        dispatch({
          type: GET_USER_SUCCESS,
          user: res.user
        })
      } else {
        if (res.message==="jwt malformed" || res.message === "jwt expired") {
          dispatch({
            type: GET_USER_FAILED,
            message: res.message
          })
          if (localStorage.getItem('refreshToken')) {
            dispatch(refreshToken());
          }
        }
      }
    } else {
      dispatch({
        type: GET_USER_FAILED,
        message: 'no response from server'
      })
    }
  })
  .catch( e => {
    dispatch({
      type: GET_USER_FAILED,
      message: 'error: '+ e.message
    })
    if (e.message==="jwt malformed" || e.message === "jwt expired")
      if (localStorage.getItem('refreshToken')) {
        dispatch(refreshToken());
      }
    }
  )
}