import { TRegistrationActions } from "../actions/registration"
import { REGISTRATION_FAILED, REGISTRATION_SUCCESS, SEND_REGISTRATION_REQUEST} from "../constatns/actionTypes"

export type TRegistrationState = {
  registrationRequest: boolean,
  registrationFailed: boolean,
  message: string
}

const initialState = {
  registrationRequest: false,
  registrationFailed: false,
  message: ''
}

export const registrationReducer = (state = initialState, action: TRegistrationActions): TRegistrationState => {
  switch (action.type){
    case SEND_REGISTRATION_REQUEST: {
      return {
        ...initialState,
        registrationRequest: true
      }
    }
    case REGISTRATION_SUCCESS: {
      return {
        ...initialState
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