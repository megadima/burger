import { sendEmailForResetPassword as sendEmailRequest } from "../../utils/burger-api.ts";
export const SEND_EMAIL_REQUEST = 'SEND_EMAIL_REQUEST'
export const SEND_EMAIL_SUCCESS = 'SEND_EMAIL_SUCCESS'
export const SEND_EMAIL_FAILED = 'SEND_EMAIL_FAILED'
export const CLEAR_FORGOTPASSWORD_STORE = 'CLEAR_FORGOTPASSWORD_STORE';

export const sendEmail = (email) => dispatch => {
  dispatch({
    type: SEND_EMAIL_REQUEST,
  });
  sendEmailRequest(email)
  .then(res => {
    if (res && res.success) {
      if (res.message === 'Reset email sent') {
        dispatch({
          type: SEND_EMAIL_SUCCESS,
          message: res.message,
        });
      } else {
        dispatch({
          type: SEND_EMAIL_FAILED,
          message: res.message
        });
      }
    } else {
      dispatch({
        type: SEND_EMAIL_FAILED,
        message: 'no response or response not success'
      });
    }
  })
  .catch(e => {
    dispatch({
      type: SEND_EMAIL_FAILED,
      message: 'error ' + e.message
    })
  })
}