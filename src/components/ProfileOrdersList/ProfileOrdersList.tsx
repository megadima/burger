import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks'
import { WS_CONNECTION_CLOSE, WS_CONNECTION_START } from '../../services/redux/constatns/wsActionTypes';
import styles from './ProfileOrdersList.module.css';
import List from '../List/List';
import OrderCard from '../OrderCard/OrderCard';
import { getCookie } from '../../utils/cookie';

const ProfileOrdersList = () => {
  const dispatch = useDispatch();
  const data = useSelector(store => store.wsOrders.message)
  const { user } = useSelector(store => store.user)

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: `wss://norma.nomoreparties.space/orders?token=${getCookie('accessToken')}`
    })
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSE })
    }
    // eslint-disable-next-line
  }, [user])

  let content = (
    <p className="text text_type_main-medium">
      Загрузка...
    </p>
  )

  if (data && data.success && user) {
    const orders = data.orders
    content = (
      <List className={styles.list}>
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