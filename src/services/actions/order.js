
import { getOrderDetails } from "../../utils/burger-api.js";

export const SEND_ORDER_REQUEST = "SEND_ORDER_REQUEST";
export const SEND_ORDER_SUCCESS = "SEND_ORDER_SUCCESS";
export const SEND_ORDER_FAILED = "SEND_ORDER_FAILED";

export const submitOrder = orderItemsIds => dispatch => {
    dispatch({
      type: SEND_ORDER_REQUEST,
    });
    getOrderDetails(orderItemsIds)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: SEND_ORDER_SUCCESS,
            number: res.order.number,
            res: res
          });
        } else {
          dispatch({
            type: SEND_ORDER_FAILED,
            message: "Server returned success=0"
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: SEND_ORDER_FAILED,
          message: err.message
        });
      });
};
