import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from '../BurgerConstructor/BurgerConstructor.module.css';
import { ingredientPropTypes } from "../../types/PropTypes";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from '../Modal/Modal';
import { useContext, useEffect, useState } from "react";
import { IngredientsContext } from "../../contexts/IngredientsContext.js";

const IngredientsItem = ({ ingredient }) => {

  return (
    <div style={{width: "100%"}}>
      <ConstructorElement
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image_mobile}
      />
    </div>
  );
}

IngredientsItem.propTypes = {
  ingredient : ingredientPropTypes.isRequired
};

const BurgerConstructor = () => {

  const ingredients = useContext(IngredientsContext);
  
  const [currentBun, setCurrentBun] = useState(
    ingredients.filter((el) => el.type === "bun")[0]
  );

  const [filling, setfilling] = useState(
    ingredients.filter((el) => el.type !== "bun")
  );

  const totalPrice = 
  filling.map((v) => v.price).reduce((accum, price) => accum + price)
  + currentBun.price*2;

  const [showModal, setShowModal] = useState(false); 

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'end' }}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${currentBun.name} '(вверх)'`}
        price={currentBun.price}
        thumbnail={currentBun.image_mobile}
      />
      <ul className={ burgerConstructorStyle.list }>
        {filling.map((item, index) => (
          <li className={ burgerConstructorStyle.item } key={index}>
            <DragIcon type="primary" />
            <IngredientsItem ingredient={ item } />
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
      <div className={`${burgerConstructorStyle.order} pt-10 pr-4`}>
        <div className={`${burgerConstructorStyle.price}`}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={() => setShowModal(true)}>
          Оформить заказ
        </Button>
        {showModal && 
        <Modal onClose={() => setShowModal(false)}>
          <OrderDetails orderItemsIds={[...filling, currentBun, currentBun].map((v) => v._id)}/>
        </Modal>}
      </div>
    </div>
  )
}

export default BurgerConstructor;


