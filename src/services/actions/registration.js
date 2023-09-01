import { sendRegistration as sendRegistrationRequest } from "../../utils/burger-api.ts";
import { setCookie } from "../../utils/cookie.ts";
import { SET_USER } from "./user.js";

export const SEND_REGISTRATION_REQUEST = 'SEND_REGISTRATION_REQUEST'
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS'
export const REGISTRATION_FAILED = 'REGISTRATION_FAILED'

export const register = (email, password, name) => dispatch => {
  dispatch({type: SEND_REGISTRATION_REQUEST});
  sendRegistrationRequest(email, password, name)
  .then(res => {
    if (res && res.success) {
      dispatch({
        type: REGISTRATION_SUCCESS,
      });
      dispatch({
        type: SET_USER,
        user: res.user
      })
      setCookie('accessToken', res.accessToken.split('Bearer ')[1], {expires: 1200}) //20 минут
      localStorage.setItem('refreshToken', res.refreshToken)
    } else {
      dispatch({
        type: REGISTRATION_FAILED,
        message: res.message
      })
    }
  })
  .catch(e => {
    dispatch({
      type: REGISTRATION_FAILED,
      message: 'error: ' + e.message
    })
  })
}