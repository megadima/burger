import {
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAILED,
} from "../actions/order";

const initialState = {
  orderRequest: false,
  orderFailed: false,
  message: "",
  res: null
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_ORDER_REQUEST: {
      return {
        ...state,
        orderFailed: false,
        orderRequest: true,
      };
    }
    case SEND_ORDER_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        orderRequest: false,
        number: action.number,
        res: action.res
      };
    }
    case SEND_ORDER_FAILED: {
      return {
        ...initialState,
        orderFailed: true,
        message: action.message,
      };
    }
    default: {
      return state;
    }
  }
};
