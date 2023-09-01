import OrderCard from '../../components/OrderCard/OrderCard'
import List from '../../components/List/List'
import styles from './FeedPage.module.css'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from '../../services/hooks'
import { WS_CONNECTION_CLOSE, WS_CONNECTION_START } from '../../services/redux/constatns/wsActionTypes'
import { statusTypes } from '../../components/helpers/OrderDetailsStatuses'

const FeedPage = () => {
  const dispatch = useDispatch();
  const data = useSelector(store => store.wsOrders.message)

  const displayedOrderStatusNumbersAmount = 30;

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: 'wss://norma.nomoreparties.space/orders/all'
    })
    return () => {
      //закрываем соединение
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
    const doneOrdersNumbers = orders.filter(v => v.status === statusTypes.done).map(order => order.number)
    const pendingOrdersNumbers = orders.filter(order => order.status === statusTypes.pending).map(order => order.number)

    const generateDigits = (numbers: Array<number>) => {
      return (
        <>
          {numbers.slice(0, displayedOrderStatusNumbersAmount - 1).map((v, i) => (
            <p className={"text text_type_digits-default"} key={i}>
              {v}
            </p>
          ))}
          {numbers.length > displayedOrderStatusNumbersAmount - 1
            ? (
              <p className={"text text_type_digits-default"}>
                {'....'}
              </p>
            ) : (
              null
            )}
        </>
      )
    }

    const { total, totalToday } = data
    content = (
      <>
        <div className={styles.content}>
          <List height='800px'>
            {orders.map((v, i) =>
              <OrderCard data={v} key={i} withStatus={false} />
            )}
          </List>

          <div className={styles.stats}>
            <div className={styles.order_board}>
              <div>
                <p className="text text_type_main-medium" style={{ whiteSpace: 'nowrap' }}>Готовы:</p>
                <div className={[styles.order_board_numbers, styles.green_digits].join(' ')}>
                {generateDigits(doneOrdersNumbers)}
                </div>
              </div>
              <div>
                <p className="text text_type_main-medium" style={{ whiteSpace: 'nowrap' }}>В работе:</p>
                <div className={styles.order_board_numbers}>
                  {generateDigits(pendingOrdersNumbers)}
                </div>
              </div>
            </div>
            <div>
              <p className="text text_type_main-medium">
                Выполнено за все время:
              </p>
              <p className={styles.big_digits + " text text_type_digits-large"}>{total}</p>
            </div>
            <div>
              <p className="text text_type_main-medium">
                Выполнено за сегодня:
              </p>
              <p className={styles.big_digits + " text text_type_digits-large"}>{totalToday}</p>
            </div>
          </div>
        </div>
        <Outlet />
      </>

    )
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.header + ' text text_type_main-large'}>Лента заказов</h2>
      {content}
    </div>
  )
}

export default FeedPage