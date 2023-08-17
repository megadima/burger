import { sendLogin as sendLoginRequest } from "../../utils/burger-api.ts";
import { setCookie } from "../../utils/cookie.ts";
import { SET_USER } from "./user.js";

export const SEND_LOGIN_REQUEST = 'SEND_LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const login = (email, password) => dispatch => {
  dispatch({
    type: SEND_LOGIN_REQUEST
  });
  sendLoginRequest(email, password)
  .then(res => {
    if (res) {
      if (res.success) {
        dispatch({
          type: SET_USER,
          user: res.user
        })
        setCookie('accessToken', res.accessToken.split('Bearer ')[1], {expires: 1200}) //20 минут
        localStorage.setItem('refreshToken', res.refreshToken);
        dispatch({
          type: LOGIN_SUCCESS,
          message: 'login success'
        });
      } else {
        dispatch({
          type: LOGIN_FAILED,
          message: res.message
        })
      }
    } else {
      dispatch({
        type: LOGIN_FAILED,
        message: 'no response from server'
      })
    }
  })
  .catch(e => {
    dispatch({
      type: LOGIN_FAILED,
      message: 'error: '+ e.message
    })
  })
}