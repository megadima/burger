import { TAllIngredientsResponse, TLogoutResponse, TOrderDetailsResponse, TResetPasswordResponse, TResponseBody, TSendEmailForResetPasswordResponse, TTokensResponse, TUserAuthDataResponse, TUserCredentialsResponse } from "../types/responseTypes";
import { getCookie } from "./cookie";

const API = "https://norma.nomoreparties.space/api";


const checkResponse = (res: Response): Promise<any> => res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export const getIngredients = (): Promise<TResponseBody<TAllIngredientsResponse>> => {
  return (
    fetch(`${API}/ingredients`)
    .then(checkResponse)
  )
}

export const getOrderDetails = (orderItemsIds: string[]): Promise<TResponseBody<TOrderDetailsResponse>> => {
  return (
    fetch(`${API}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': "Bearer "+ getCookie('accessToken')
      },
      body: JSON.stringify({ingredients: orderItemsIds})
    })
      .then(checkResponse)
  )
}

export const sendEmailForResetPassword = (email: string): Promise<TResponseBody<TSendEmailForResetPasswordResponse>> => {
  return (
    fetch(`${API}/password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: email})
    })
      .then(checkResponse)
  )
}

export const sendResetPassword = (password: string, token: string): Promise<TResponseBody<TResetPasswordResponse>> => {
  return (
    fetch(`${API}/password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: password,
        token: token
      })
    })
      .then(checkResponse)
  )
}

export const sendRegistration = (email: string, password: string, name: string): Promise<TResponseBody<TUserCredentialsResponse>>  => {
  return (
    fetch(`${API}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name
      })
    })
      .then(checkResponse)
  )
}

export const sendLogin = (email: string, password: string): Promise<TResponseBody<TUserAuthDataResponse>> => {
  return (
    fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(checkResponse)
  )
}

export const sendLogout = (refreshToken: string): Promise<TResponseBody<TLogoutResponse>> => {
  return (
    fetch(`${API}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: refreshToken
      })
    })
      .then(checkResponse)
  )
}

export const getUser = (): Promise<TResponseBody<TUserCredentialsResponse>> => {
  return (
    fetch(`${API}/auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': "Bearer " + getCookie('accessToken') 
      },
    })
      .then(checkResponse)
  )
}

export const sendRefreshToken = (): Promise<TResponseBody<TTokensResponse>> => {
  return (
    fetch(`${API}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken')
      })
    })
      .then(checkResponse)
  )
}