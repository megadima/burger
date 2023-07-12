import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from '../BurgerConstructor/BurgerConstructor.module.css';
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from '../Modal/Modal';
import { useContext, useMemo, useState } from "react";
import { IngredientsContext } from "../../contexts/IngredientsContext.js";
import { getOrderDetails } from "../../utils/burger-api.js";

const BurgerConstructor = () => {

  const ingredients = useContext(IngredientsContext);

  const currentBun = useMemo(() => ingredients.filter((el) => el.type === "bun")[0], [ingredients]);

  const filling = useMemo(() => ingredients.filter((el) => el.type !== "bun"), [ingredients]);
  const [showErrorModal, setShowErrorModal] = useState(false);



  const orderItemsIds = useMemo(() => [...filling, currentBun, currentBun].map((v) => v._id), [filling, currentBun])

  const [orderState, setOrderState] = useState({
    data: [],
    isLoading: false,
    hasError: false
  });

  const [showOrderModal, setShowOrderModal] = useState(false);

  const createOrder = () => {
    setOrderState({ ...orderState, isLoading: true });
    getOrderDetails(orderItemsIds)
      .then(res => setOrderState({ ...orderState, data: res, isLoading: false }))
      .then(() => setShowOrderModal(true))
      .catch(e => setOrderState({ ...orderState, isLoading: false, hasError: true }));
  }

  const totalPrice =
  useMemo(() => 
    filling.map((v) => v.price).reduce((accum, price) => accum + price)
    + currentBun.price * 2, [filling, currentBun])


  const { orderData, orderIsLoadind, orderHasError } = orderState;
  return (
    <div className={styles.container}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${currentBun.name} '(вверх)'`}
        price={currentBun.price}
        thumbnail={currentBun.image_mobile}
      />
      <ul className={styles.list}>
        {filling.map((item, index) => (
          <li className={styles.item} key={index}>
            <DragIcon type="primary" />
            <div className={styles.constructor_element__wrapper}>
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image_mobile}
              />
            </div>
          </li>
        ))
        }
      </ul>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${currentBun.name} '(низ)'`}
        price={currentBun.price}
        thumbnail={currentBun.image_mobile}
      />
      <div className={`${styles.order} pt-10 pr-4`}>
        <div className={`${styles.price}`}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={() => {
            createOrder();
          }}>
          {orderIsLoadind ? "Загрузка" : "Оформить заказ"}
        </Button>

        {showOrderModal &&
          <Modal onClose={() => setShowOrderModal(false)}>
            <OrderDetails data={orderState.data} />
          </Modal>}

        {showErrorModal &&
          <Modal onClose={() => setShowErrorModal(false)}>
            <p className="text text text_type_main-default">Ошибка при получении данных с сервера</p>
          </Modal>}
      </div>
    </div>
  )
}

export default BurgerConstructor;


