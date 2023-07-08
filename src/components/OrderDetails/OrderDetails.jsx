import styles from './OrderDetails.module.css';
import PropTypes from "prop-types";
import ok_image from './accept.jpg';

const OrderDetails = ({ data }) => {
  const success = data?.success;

  return (
    <div className={styles.content}>
      {!success &&
        <>
          <p className={`${styles.identyfier} text text_type_main-default`}>Произошла неизвестная ошибка!</p>
          <p className={`${styles.identyfier} text text text_type_main-small`}>Пока мы ее чиним, подумайте, как сделать Ваш бургер еще вкуснее!</p>
        </>
      }
      {success &&
        <>
          <p className={`${styles.number} text text_type_digits-large`}>{data.order.number}</p>
          <p className={`${styles.identyfier} text text_type_main-default`}>{data.name}</p>
          <img className={styles.ok_img} src={ok_image} alt="Success" />
          <p className={`${styles.started} text text_type_main-small`}>Ваш заказ начали готовить</p>
          <p className={`${styles.wait} text text_type_main-small text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
        </>
      }
    </div>
  )
}

OrderDetails.propTypes = {
  orderItemsIds: PropTypes.arrayOf(PropTypes.string)
};

export default OrderDetails;