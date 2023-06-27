const API = "https://norma.nomoreparties.space/api";


const checkResponse = (res) => res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export const getIngredients = () => {
  return (
    fetch(`${API}/ingredients`)
    .then(checkResponse)
  )
}