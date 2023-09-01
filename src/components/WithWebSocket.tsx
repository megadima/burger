import React, { FC, useEffect } from 'react'
import { useDispatch } from '../services/hooks'
import { WS_CONNECTION_CLOSE, WS_CONNECTION_START } from '../services/redux/constatns/wsActionTypes';

const WithWebSocket: FC<{url: string, children: React.ReactNode}> = ({url, children}) => {


  //этот компонент сделан только для того чтобы при переходе по ссылке подтягивались данные с вебсокета.
  //скорее всего, как я думаю, заказы при переходе по ссылке должны вытягиваться откуда-нибудь HTTP-методом
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: url
    })
  
    return () => {
      dispatch({
        type: WS_CONNECTION_CLOSE
      })
    }
  }, [])
  

  return (
    <>
      {children}
    </>
  )
}

export default WithWebSocket