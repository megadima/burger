import styles from './OrderDetails.module.css';
import PropTypes from "prop-types";
import ok_image from './accept.jpg';
import { useEffect, useState } from 'react';
import { getOrderDetails } from '../../utils/burger-api.js';

const OrderDetails = ({ orderItemsIds }) => {
  const [state, setState] = useState({
    data: [],
    isLoading: false,
    hasError: false
  });

  const getData = () => {
    setState({ ...state, isLoading: true });
    getOrderDetails(orderItemsIds)
      .then(res => setState({ ...state, data: res, isLoading: false }))
      .catch(e => setState({ ...state, isLoading: false, hasError: true }));
  }

  useEffect(() => {
    getData();
  }, []);

  const { data, isLoading, hasError } = state;
  const success = data?.success;

  return (
    <div className={styles.content}>
      {isLoading &&
        <p className={`${styles.identyfier} text text text_type_main-default`}>Загрузка</p>
      }
      {hasError && 
        <p className={`${styles.identyfier} text text text_type_main-default`}>Ошибка при получении данных с сервера!</p>
      }
      {!hasError && !success &&
        <>
          <p className={`${styles.identyfier} text text_type_main-default`}>Произошла неизвестная ошибка!</p>
          <p className={`${styles.identyfier} text text text_type_main-small`}>Пока мы ее чиним, подумайте, как сделать Ваш бургер еще вкуснее!</p>
        </>
      }
      {!isLoading && !hasError && success &&
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