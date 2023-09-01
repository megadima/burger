import styles from './CreatedOrderDetails.module.css';
import ok_image from './accept.jpg';
import { FC } from 'react';
import { useSelector } from '../../services/hooks';

const CreatedOrderDetails: FC = () => {
  const { isOrderRequest, isOrderFailed, message, res } = useSelector(store => store.order)
  const success = res?.success;

  if (isOrderRequest) {
    return (
      <p className={`${styles.identyfier} text text_type_main-default`} style={{textAlign: 'center'}}>Загрузка...</p>
    )
  }

  return (
    <div className={styles.content}>
      {(isOrderFailed || !success) &&
        <>
          <p className={`${styles.identyfier} text text_type_main-default`}>Произошла ошибка!</p>
          <p className={`${styles.identyfier} text text_type_main-default`}>{message}</p>
          <p className={`${styles.identyfier} text text text_type_main-small`}>Пока мы ее чиним, подумайте, как сделать Ваш бургер еще вкуснее!</p>
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