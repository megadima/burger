import { TUser, TWSOrder } from "./data";
import { TIngredient } from "./data";

export type TResponseBody<T> =
  { //if wrong response
    success: false;
    message: string;
  } | (
    //if success response
    { success: true } & T
  );


export type TAllIngredientsResponse = {
  data: ReadonlyArray<TIngredient>
}

export type TOrderDetailsResponse = {
  order: {
    number: number;
  };
  name: string;
}

export type TSendEmailForResetPasswordResponse = {
  message: string;
}

export type TResetPasswordResponse = {
  message: string;
}

export type TUserCredentialsResponse = {
  user: TUser;
}

export type TTokensResponse = {
  accessToken: string;
  refreshToken: string;
}

export type TUserAuthDataResponse = TTokensResponse & TUserCredentialsResponse;

export type TLogoutResponse = {
  message: string
}

export type TWSOrdersResponse = {
    orders: Array<TWSOrder>,
    total: number,
    totalToday: number
  }

  