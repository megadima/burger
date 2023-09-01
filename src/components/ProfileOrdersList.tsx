import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from '../services/hooks'
import { WS_CONNECTION_CLOSE, WS_CONNECTION_START } from '../services/redux/constatns/wsActionTypes';
import List from './List/List';
import OrderCard from './OrderCard/OrderCard';

const ProfileOrdersList = () => {
  const dispatch = useDispatch();
  const data = useSelector(store => store.wsOrders.message)

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: 'wss://norma.nomoreparties.space/orders'
    })
    return () => {
      dispatch({
        type: WS_CONNECTION_CLOSE
      })
    }
    // eslint-disable-next-line
  }, [])

  let content = (
    <p className="text text_type_main-medium">
      Загрузка...
    </p>
  )

  if (data && data.success) {
    const orders = data.orders
    content = (
      <List height='800px' marginTop='40px'>
        {[...orders].reverse().map((v, i) =>
          <OrderCard data={v} key={i} withStatus />
        )}
      </List>
    )
  }
  return (
    <>
      {content}
      <Outlet />
    </>
  )

}

export default ProfileOrdersList