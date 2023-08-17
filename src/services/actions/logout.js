import { deleteCookie } from "../../utils/cookie.js";
import { CLEAR_USER } from "./user.js"
import { sendLogout as sendLogoutRequest } from "../../utils/burger-api.js";
import { CLEAR_CART } from "./cart.js";

export const SEND_LOGOUT_REQUEST = 'SEND_LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const logout = () => dispatch => {
  dispatch({
    type: SEND_LOGOUT_REQUEST
  });
  sendLogoutRequest(localStorage.getItem('refreshToken'))
  .then(res => {
    if (res && res.success){
      if (res.message === "Successful logout") {
        dispatch({
          type: CLEAR_USER
        });

        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');

        dispatch({
          type: CLEAR_CART
        });

        dispatch({
          type: LOGOUT_SUCCESS,
          message: res.message
        });
      } else {
        dispatch({
          type: LOGOUT_FAILED,
          message: res.message
        });
      }
    } else {
      dispatch({
        type: LOGOUT_FAILED,
        message: 'no response or response not success'
      });
    }
  })
  .catch(e => dispatch({
    type: LOGOUT_FAILED, 
    message: 'error: ' + e.message
  }))
}