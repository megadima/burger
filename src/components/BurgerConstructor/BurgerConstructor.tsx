import {
  ConstructorElement,
  CurrencyIcon,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from '../BurgerConstructor/BurgerConstructor.module.css';
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from '../Modal/Modal';
import { FC, useMemo, useState } from "react";
import { useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { ADD_TO_CART } from "../../services/actions/cart.js";
import CartFillingItem from "../CartFillingItem/CartFillingItem";
import { submitOrder } from "../../services/actions/order.js";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../services/actions/user.js";
import { TCartElement, TIngredient } from "../../types/types";

const BurgerConstructor: FC = () => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //@ts-ignore
  const user = useSelector(store => store.user.user)

  //@ts-ignore
  const currentBun = useSelector(store => store.cart.bun);
  //@ts-ignore
  const filling = useSelector(store => store.cart.filling);

  //у булочки нет ключа, поэтому проверяем на то, является ли это ингредиентом.
  const isBunIngredient = (item: any): item is TIngredient => {
    return (item as TIngredient)._id !== undefined
  }

  const isNotBunIngredient = (item: any): item is TCartElement => {
    return (item as TCartElement).item?._id !== undefined && (item as TCartElement).key !== undefined
  }

  const orderItemsIds: Array<string> = useMemo(() => [...filling, currentBun, currentBun]
  .map((elem: TCartElement | TIngredient) => {
    if (isBunIngredient(elem)) return elem._id  // у булочек нет ключа 
    else if (isNotBunIngredient(elem)) return elem.item._id 
    else return ''
  })
  .filter(elem => elem !== ''), [filling, currentBun])

  const totalPrice = useMemo(() => {
    let totalPrice = currentBun?.price ? currentBun.price * 2 : 0
    if (filling.length) {
      const fillingPrices = filling.map((v: TCartElement) => v.item.price);
      totalPrice += fillingPrices.reduce((accum: number, price: number) => accum + price)
    }
    return totalPrice
  }, [filling, currentBun])

  const [,dropTargetRef] = useDrop({
    accept: 'ingredient',
    drop(item: TIngredient) {
      onDropHandler(item);
    }
  })


  const onDropHandler = (item: TIngredient): void => {
    dispatch({
      type: ADD_TO_CART,
      item: item,
    })
  }
  
  //@ts-ignore
  const { orderRequest, orderFailed, message, res} = useSelector(store => store.order);

  const onCheckoutClickHandler = (e: React.SyntheticEvent<Element, Event>): void => {
    //@ts-ignore
    dispatch(getUserData());
    if (user) {
      if (currentBun.price!==null && !orderRequest)
        console.log('asdasd')
        //@ts-ignore
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
        : filling.map((elem: TCartElement, index: number) => (
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


