import styles from './CreatedOrderDetails.module.css';
import ok_image from './accept.jpg';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { submitOrder } from '../../services/redux/actions/order';

const CreatedOrderDetails: FC<{ orderItemsIds: Array<string> }> = ({ orderItemsIds }) => {
  const { isOrderRequest, isOrderFailed, res, message } = useSelector(store => store.order)
  const success = res?.success;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(submitOrder(orderItemsIds))
    // eslint-disable-next-line
  }, [])


  if (isOrderRequest) {
    return (
      <p className={'text text_type_main-medium'} style={{textAlign: 'center'}}>Загрузка...</p>
    )
  }

  return (
    <div className={styles.content}>
      {(isOrderFailed || !success) &&
        <>
          <p className={`${styles.identyfier} text text_type_main-default`}>Произошла ошибка!</p>
          <p className={`${styles.identyfier} text text_type_main-default`}>{message}</p>
          <p className={`${styles.identyfier} text text_type_main-default`}>Попробуйте заново авторизоваться, скорее всего это поможет.</p>
          <p className={`${styles.identyfier} text text text_type_main-small`}>Пока мы чиним ошибку, подумайте, как сделать Ваш бургер еще вкуснее!</p>
        </>
      }
      {success &&
        <>
          <p className={`${styles.number} text text_type_digits-large`}>{res.order.number}</p>
          <p className={`${styles.identyfier} text text_type_main-default`}>{res.name}</p>
          <img className={styles.ok_img} src={ok_image} alt="Success" />
          <p className={`${styles.started} text text_type_main-small`}>Ваш заказ начали готовить</p>
          <p className={`${styles.wait} text text_type_main-small text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
        </>
      }
    </div>
  )
}

export default CreatedOrderDetails;