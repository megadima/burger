import List from '../../components/List/List';
import styles from './OrderDetailsPage.module.css';
import RoundIngredientIcon from '../../components/RoundIngredientIcon/RoundIngredientIcon';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import { orderStatusColors, orderStatusTexts } from '../../components/helpers/OrderDetailsStatuses';
import { getIngredientsDataForList } from './OrderDetailsPageHelper';

const OrderDetailsPage = () => {

  const { orderId } = useParams();
  const ordersData = useSelector(store => store.wsOrders.message)
  const location = useLocation();
  const isModal = location.state?.isOrderOpenedInModal;
  const allIngredients = useSelector(store => store.ingredients.ingredients)

  let content = (
    <p className={styles.title + " text text_type_main-medium"}>
      Загрузка
    </p>
  )

  if (ordersData?.success) {
    const order = ordersData.orders.find((order) => order._id === orderId)
    if (order) {

      //создаем объект типа TListIngredientData, в котором собираем данные для отрисовки ингредиентов
      const {listIngredientsData, totalPrice} = getIngredientsDataForList(order.ingredients, allIngredients);

      content = (
        <>
          <p className="text text_type_digits-default" style={{ textAlign: isModal ? 'left' : 'center' }}>#{order.number}</p>
          <p className={styles.title + " text text_type_main-medium"}>
            {order.name}
          </p>
          <p className={styles.status + " text text_type_main-default"} style={
            { color: orderStatusColors[order.status] }
          }>
            {orderStatusTexts[order.status]}
          </p>
          <p className={styles.composition_title + " text text_type_main-medium"}>
            Состав:
          </p>
          <List className={styles.list}>
            {Object.values(listIngredientsData).map((elem, i) => {
              if (elem) {
                return (
                  <div className={styles.ingredient} key={i}>
                    <div>
                      <RoundIngredientIcon image={elem.image} />
                    </div>
                    <p className={styles.ingredient_title + " text text_type_main-default"}>
                      {elem.title}
                    </p>
                    <div className={styles.ingredient_price}>
                      <p className="text text_type_digits-default">{elem.amount} x {elem.price}</p>
                      <CurrencyIcon type="primary" />
                    </div>
                  </div>
                )
              } else {
                return (
                  <div className={styles.ingredient} key={i}>
                    <p className={styles.ingredient_title + " text text_type_main-default"}>
                      Ингредиент не найден
                    </p>
                  </div>
                )
              }
            })}
          </List>
          <div className={styles.total}>
            <p className="text text_type_main-default text_color_inactive">
              <FormattedDate date={new Date(order.createdAt)} />
            </p>
            <div className={styles.ingredient_price}>
              <p className="text text_type_digits-default">{totalPrice}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </>
      )
    } else {
      content = (
        <>
          <p className={styles.title + " text text_type_main-medium"}>
            {'Извините, мы не смогли найти этот заказ :('}
          </p>
          <p className={styles.title + " text text_type_main-medium"}>
            Скорее всего этот заказ просто не существует
          </p>
        </>
      )
    }
  }

  return (
    <div className={styles.wrapper} style={{ margin: isModal ? '60px auto 20px' : '122px auto 20px' }}>
      {content}
    </div>
  )
}

export default OrderDetailsPage