import { sendResetPassword as sendResetPasswordRequest } from "../../utils/burger-api.js";
export const SEND_RESET_PASSWORD_REQUEST = 'SEND_RESET_PASSWORD_REQUEST'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_FAILED = 'SEND_RESET_PASSWORD_FAILED'

export const sendResetPassword = (password, token) => dispatch => {
  dispatch({
    type: SEND_RESET_PASSWORD_REQUEST
  });
  sendResetPasswordRequest(password, token)
  .then(res => {
    if (res && res.success) {
      if (res.message === "Password successfully reset"){
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          message: res.message
        });
      } else {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          message: res.message
        });
      }
    } else {
      dispatch({
        type: RESET_PASSWORD_FAILED,
        message: 'no response or response not success'
      });
    }
  })
  .catch(e => {
    dispatch({
      type: RESET_PASSWORD_FAILED,
      message: 'error: ' + e.message
    })
  })
}