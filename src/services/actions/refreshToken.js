import { sendRefreshToken as sendRefreshTokenRequest } from "../../utils/burger-api.js";
import { setCookie } from "../../utils/cookie.js";
import { logout } from "./logout.js";

export const SEND_REFRESH_TOKEN_REQUEST = 'SEND_REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED'; 

export const refreshToken = () => dispatch => {
  dispatch({
    type:SEND_REFRESH_TOKEN_REQUEST
  })
  sendRefreshTokenRequest()
  .then(res => {
    if (res) {
      if (res.success) {
        setCookie('accessToken', res.accessToken.split('Bearer ')[1], {expires: 1200}) //20 минут
        localStorage.setItem('refreshToken', res.refreshToken);
        dispatch({
          type: REFRESH_TOKEN_SUCCESS,
          message: 'refresh_token_success'
        })
      } else {
        dispatch({
          type: REFRESH_TOKEN_FAILED,
          message: res.message
        })
        logout();
      }
    } else {
      dispatch({
        type: REFRESH_TOKEN_FAILED,
        message: 'no response from server'
      })
      logout();
    }
  })
  .catch( e => {
    dispatch({
      type: REFRESH_TOKEN_FAILED,
      message: 'error '+ e.message
    })
    logout();
  })

}