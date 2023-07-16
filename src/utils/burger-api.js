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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ingredients: orderItemsIds})
    })
      .then(checkResponse)
  )
}