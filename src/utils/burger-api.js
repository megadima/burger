import { getCookie } from "./cookie.js";

const API = "https://norma.nomoreparties.space/api";


const checkResponse = (res) => res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export const getIngredients = () => {
  return (
    fetch(`${API}/ingredients`)
      .then(checkResponse)
  )
}

export const getOrderDetails = (orderItemsIds) => {
  return (
    fetch(`${API}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': "Bearer "+getCookie('accessToken')
      },
      body: JSON.stringify({ingredients: orderItemsIds})
    })
      .then(checkResponse)
  )
}

export const sendEmail = email => {
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

export const sendResetPassword = (password, token) => {
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

export const sendRegistration = (email, password, name) => {
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

export const sendLogin = (email, password) => {
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

export const sendLogout = (refreshToken) => {
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

export const getUser = () => {
  return (
    fetch(`${API}/auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': "Bearer "+getCookie('accessToken') 
      },
    })
      .then(checkResponse)
  )
}

export const sendRefreshToken = () => {
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