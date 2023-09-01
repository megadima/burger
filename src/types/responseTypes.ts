import { TIngredient } from "./types";

export type TResponseBody<T> = 
{ //if wrong response
  success: false;
  message: string;
} | (
  //if success response
  {success: true} & T
);


export type TAllIngredientsResponse = {
  data: ReadonlyArray<TIngredient>,
}

export type TOrderDetailsResponse = {
  data: {
    success: boolean;
    order: {
      number: number;
    };
    name: string;
  }
}

export type TSendEmailForResetPasswordResponse = {
  message: 'Reset email sent';
}

export type TResetPasswordResponse = {
  message: 'Password successfully reset';
}

export type TUserCredentialsResponse = {
  user: {
    email: string;
    password: string;
  }
}

export type TTokensResponse = {
  accessToken: string;
  refreshToken: string;
}

export type TUserAuthDataResponse = TTokensResponse & TUserCredentialsResponse;

export type TLogoutResponse = {
  message: 'Successful logout'
}