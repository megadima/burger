import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks'
import { PROFILE_WS_CONNECTION_CLOSE, PROFILE_WS_CONNECTION_START } from '../../services/redux/constatns/wsActionTypes';
import styles from './ProfileOrdersList.module.css';
import List from '../List/List';
import OrderCard from '../OrderCard/OrderCard';
import { getCookie } from '../../utils/cookie';
import { WS_API } from '../../utils/burger-api';

const ProfileOrdersList = () => {
  const dispatch = useDispatch();
  const data = useSelector(store => store.profileWSOrders.message)

  useEffect(() => {
    dispatch({
      type: PROFILE_WS_CONNECTION_START,
      payload: `${WS_API}?token=${getCookie('accessToken')}`
    })
    return () => {
      dispatch({ type: PROFILE_WS_CONNECTION_CLOSE })
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