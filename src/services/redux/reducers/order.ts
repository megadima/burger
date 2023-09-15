import { TOrderActions } from "../actions/order";
import {
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAILED,
} from "../constatns";
import { TOrderDetailsResponse, TResponseBody } from "../../types/responseTypes";

export type TOrderState = {
  isOrderRequest: boolean,
  isOrderFailed: boolean,
  message: string,
  res: null | TResponseBody<TOrderDetailsResponse>,
  number: number | null
}

const initialState: TOrderState = {
  isOrderRequest: false,
  isOrderFailed: false,
  message: "",
  res: null,
  number: null
};

export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
  switch (action.type) {
    case SEND_ORDER_REQUEST: {
      return {
        ...initialState,
        isOrderFailed: false,
        isOrderRequest: true,
      };
    }
    case SEND_ORDER_SUCCESS: {
      return {
        ...state,
        isOrderRequest: false,
        isOrderFailed: false,
        number: action.number,
        res: action.res
      };
    }
    case SEND_ORDER_FAILED: {
      return {
        ...initialState,
        isOrderRequest: false,
        isOrderFailed: true,
        message: action.message,
      };
    }
    default: {
      return state;
    }
  }
};
