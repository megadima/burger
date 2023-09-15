import React, { FC, useEffect } from 'react'
import { useDispatch } from '../services/hooks'
import { TWSMiddlewareActions } from '../services/types/redux';

const WithWebSocket: FC<{ url: string, children: React.ReactNode, WSMiddlewareActions: TWSMiddlewareActions }> = ({ url, children, WSMiddlewareActions }) => {

  //этот компонент сделан только для того чтобы при переходе по ссылке подтягивались данные с вебсокета.
  //скорее всего, как я думаю, заказы при переходе по ссылке должны вытягиваться откуда-нибудь HTTP-методом

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: WSMiddlewareActions.wsInit,
      payload: url
    });
    return () => {
      dispatch({
        type: WSMiddlewareActions.wsClose,
      })
    }
    // eslint-disable-next-line
  }, [])


  return (
    <>
      {children}
    </>
  )
}

export default WithWebSocket