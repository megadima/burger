import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from '../BurgerConstructor/BurgerConstructor.module.css';
import { ingredientPropTypes } from "../../types/PropTypes";
import PropTypes from "prop-types";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from '../Modal/Modal';
import { useState } from "react";

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

const BurgerConstructor = (props) => {
  const buns = props.ingredients.filter((el) => el.type === "bun"),
        saucesAndMains = props.ingredients.filter((el) => el.type !== "bun");

  const [showModal, setShowModal] = useState(false); 

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'end' }}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${buns[0].name} '(вверх)'`}
        price={buns[0].price}
        thumbnail={buns[0].image_mobile}
      />
      <ul className={ burgerConstructorStyle.list }>
        {saucesAndMains.map((item, index) => (
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
        text={`${buns[0].name} '(низ)'`}
        price={buns[0].price}
        thumbnail={buns[0].image_mobile}
      />
      <div className={`${burgerConstructorStyle.order} pt-10 pr-4`}>
        <div className={`${burgerConstructorStyle.price}`}>
          <p className="text text_type_digits-medium">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={() => setShowModal(true)}>
          Оформить заказ
        </Button>
        {showModal && 
        <Modal onClose={() => setShowModal(false)}>
          <OrderDetails/>
        </Modal>}
      </div>
    </div>
  )
}


BurgerConstructor.propTypes ={
  ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired
};

export default BurgerConstructor;


