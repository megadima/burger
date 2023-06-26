import styles from './OrderDetails.module.css';
import ok_image from './accept.jpg';

const OrderDetails = () => {
  return (
    <div className={styles.content}>
      <p className={`${styles.number} text text_type_digits-large`}>034536</p>
      <p className={`${styles.identyfier} text text_type_main-default`}>идентификатор заказа</p>
      <img className={styles.ok_img} src={ok_image} alt="Success"/>
      <p className={`${styles.started} text text_type_main-small`}>Ваш заказ начали готовить</p>
      <p className={`${styles.wait} text text_type_main-small text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

export default OrderDetails;