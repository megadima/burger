import { getOrderDetails } from "../../../utils/burger-api";
import { SEND_ORDER_FAILED, SEND_ORDER_REQUEST, SEND_ORDER_SUCCESS } from "../constatns/actionTypes";
import { AppDispatch, AppThunk } from "../../types/redux";
import { TOrderDetailsResponse, TResponseBody } from "../../types/responseTypes";

export interface ISendOrderRequestAction {
  readonly type: typeof SEND_ORDER_REQUEST;
}

export interface ISendOrderFailedAction {
  readonly type: typeof SEND_ORDER_FAILED;
  message: string
}

export interface ISendOrderSuccessAction {
  readonly type: typeof SEND_ORDER_SUCCESS;
  number: number;
  res: TResponseBody<TOrderDetailsResponse>
}

export const sendOrderRequestAction = (): ISendOrderRequestAction => ({ type: SEND_ORDER_REQUEST })
export const sendOrderFailedAction = (message: string): ISendOrderFailedAction => ({ type: SEND_ORDER_FAILED, message })
export const sendOrderSuccessAction = (number: number, res: TResponseBody<TOrderDetailsResponse>): ISendOrderSuccessAction => ({ type: SEND_ORDER_SUCCESS, number, res })

export type TOrderActions = ISendOrderRequestAction
  | ISendOrderFailedAction
  | ISendOrderSuccessAction

export const submitOrder: AppThunk = (orderItemsIds: ReadonlyArray<string>) => (dispatch: AppDispatch) => {
  dispatch(sendOrderRequestAction());
  getOrderDetails(orderItemsIds)
    .then(res => {
      if (res) {
        if (res.success) {
          dispatch(sendOrderSuccessAction(res.order.number, res))
        } else {
          dispatch(sendOrderFailedAction(res.message))
        }
      } else {
        dispatch(sendOrderFailedAction('no response from server'))
      }
    })
    .catch(e => {
      dispatch(sendOrderFailedAction('error: ' + e.message))
    })
}
