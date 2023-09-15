import {
  ConstructorElement,
  CurrencyIcon,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from '../BurgerConstructor/BurgerConstructor.module.css';
import CreatedOrderDetails from "../CreatedOrderDetails/CreatedOrderDetails";
import Modal from '../Modal/Modal';
import { FC, useMemo, useState } from "react";
import { useDrop } from 'react-dnd';
import { addToCartAction, clearCartAction } from "../../services/redux/actions/cart";
import CartFillingItem from "../CartFillingItem/CartFillingItem";
import { TCartElement, TIngredient } from "../../services/types/data";
import { useDispatch, useSelector } from "../../services/hooks";
import { TInitialBun } from "../../services/redux/reducers/cart";
import ProtectedRoute from "../ProtectedRoute";

const BurgerConstructor: FC = () => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const currentBun = useSelector(store => store.cart.bun);
  const filling = useSelector(store => store.cart.filling);

  //у булочки нет ключа, поэтому проверяем на то, является ли это ингредиентом.
  const isBunIngredient = (item: any): item is TIngredient => {
    return (item as TIngredient)._id !== undefined
  }

  const isNotBunIngredient = (item: any): item is TCartElement => {
    return (item as TCartElement).item?._id !== undefined && (item as TCartElement).key !== undefined
  }

  const orderItemsIds: Array<string> = useMemo(() => [currentBun, ...filling, currentBun]
    .map((elem: TCartElement | TIngredient | TInitialBun) => {
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

  const [, dropTargetRef] = useDrop({
    accept: 'ingredient',
    drop(item: TIngredient) {
      onDropHandler(item);
    }
  })

  const onDropHandler = (item: TIngredient): void => {
    dispatch(addToCartAction(item))
  }

  const { isOrderRequest, res } = useSelector(store => store.order);

  return (
    <div ref={dropTargetRef} id='constructor' className={styles.container}>
      <div className={styles.bun}>
        <ConstructorElement
          type="top"
          isLocked
          text={`${currentBun.name} (верх)`}
          price={currentBun.price as number}
          thumbnail={currentBun.image_mobile}
        />
      </div>
      <ul className={styles.list}>
        {!filling.length
        
          ? (
            <li style={{ textAlign: 'center' }}>
              <p className="text text text_type_main-default">Перетяните сюда начинку (или булочку)</p>
            </li>
          ) 
          
          : (
            filling.map((elem: TCartElement, index: number) => (
              <CartFillingItem elem={elem} index={index} key={elem.key} />
            ))
          )
        }
      </ul>
      <div className={styles.bun}>
        <ConstructorElement
          type="bottom"
          isLocked
          text={`${currentBun.name} (низ)`}
          price={currentBun.price as number}
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
          onClick={() => setShowModal(true)}
        >
          {isOrderRequest ? "Загрузка" : 'Оформить заказ'}
        </Button>

        {showModal &&
          <Modal onClose={() => {
            setShowModal(false)
            if (res?.success) dispatch(clearCartAction())
          }}>
            {currentBun.price
              ? (
                <ProtectedRoute element={
                  <CreatedOrderDetails orderItemsIds={orderItemsIds} />
                } />
              ) : (
                <p className="text text text_type_main-default" style={{ textAlign: 'center' }}>
                  Добавьте булочку
                </p>
              )
            }
          </Modal>
        }
      </div>
    </div>
  )
}

export default BurgerConstructor;


