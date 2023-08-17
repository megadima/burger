import {
  ConstructorElement,
  CurrencyIcon,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from '../BurgerConstructor/BurgerConstructor.module.css';
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from '../Modal/Modal';
import { useMemo, useState } from "react";
import { useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { ADD_TO_CART } from "../../services/actions/cart.js";
import CartFillingItem from "../CartFillingItem/CartFillingItem.jsx";
import { submitOrder } from "../../services/actions/order.js";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../services/actions/user.js";

const BurgerConstructor = () => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(store => store.user.user)

  const currentBun = useSelector(store => store.cart.bun);
  const filling = useSelector(store => store.cart.filling);
  const orderItemsIds = useMemo(() => [...filling, currentBun, currentBun]
  .map((elem) => 
    elem.key ? elem.item._id : elem._id  // у булочек нет ключа
  ), [filling, currentBun])

  const totalPrice = useMemo(() => {
    let totalPrice = currentBun?.price ? currentBun.price * 2 : 0
    if (filling.length) {
      const fillingPrices = filling.map((v) => v.item.price);
      totalPrice += fillingPrices.reduce((accum, price) => accum + price)
    }
    return totalPrice
  }, [filling, currentBun])

  const [,dropTargetRef] = useDrop({
    accept: 'ingredient',
    drop(item) {
      onDropHandler(item);
    }
  })

  const onDropHandler = (item) => {
    dispatch({
      type: ADD_TO_CART,
      item: item,
    })
  }
  
  const { orderRequest, orderFailed, message, res} = useSelector(store => store.order);

  const onCheckoutClickHandler = e => {
    dispatch(getUserData());
    if (user) {
      if (currentBun.price!==null && !orderRequest)
        dispatch(submitOrder(orderItemsIds));
      setShowModal(true)
    } else {
      navigate('/login')
    }
  }

  return (
    <div ref={dropTargetRef} className={styles.container}>
      <div className={styles.bun}>
        <ConstructorElement
          type="top"
          isLocked
          text={`${currentBun.name} (верх)`}
          price={currentBun.price}
          thumbnail={currentBun.image_mobile}
        />
      </div>
      <ul className={styles.list}>
        {!filling.length
        ? <li style={{textAlign: 'center'}}>
            <p className="text text text_type_main-default">Перетяните сюда начинку (или булочку)</p>
          </li>
        : filling.map((elem, index) => (
          <CartFillingItem elem={elem} index={index} key={index} />
          ))
        }
      </ul>
      <div className={styles.bun}>
        <ConstructorElement
          type="bottom"
          isLocked
          text={`${currentBun.name} (низ)`}
          price={currentBun.price}
          thumbnail={currentBun.image_mobile}
        />
      </div>
      <div className={`${styles.order} pt-10 pr-4`}>
        <div className={`${styles.price}`}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={onCheckoutClickHandler}
        >
          {orderRequest && !orderFailed ? "Загрузка" : "Оформить заказ"}
        </Button>

        {showModal &&
          <Modal onClose={() => setShowModal(false)}>
            {currentBun.price!==null
            ?
              (!orderRequest && !orderFailed
              ? <OrderDetails data={res} /> 
              : <p className="text text text_type_main-default" style={{textAlign: 'center'}}>
                {message}
                </p>
              )
            :
              <p className="text text text_type_main-default" style={{textAlign: 'center'}}>
                Добавьте булочку              
              </p>
            }
          </Modal>
        }
      </div>
    </div>
  )
}

export default BurgerConstructor;


