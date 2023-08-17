import { REGISTRATION_FAILED, REGISTRATION_SUCCESS, SEND_REGISTRATION_REQUEST } from "../actions/registration.js"

const initialState = {
  registrationRequest: false,
  registrationFailed: false,
  message: ''
}

export const registrationReducer = (state = initialState, action) => {
  switch (action.type){
    case SEND_REGISTRATION_REQUEST: {
      return {
        ...initialState,
        registrationRequest: true
      }
    }
    case REGISTRATION_SUCCESS: {
      return {
        ...state,
        registrationRequest: false,
        registrationFailed: false,
      }
    }
    case REGISTRATION_FAILED: {
      return {
        ...initialState,
        registrationFailed: true,
        message: action.message
      }
    }
    default:
      return state
  }
}