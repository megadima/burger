import React, {useState} from 'react';
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyle from '../BurgerIngredients/BurgerIngredients.module.css';
import PropTypes from "prop-types";
import { ingredientPropTypes } from '../../types/PropTypes';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

const IngredientsItem = ({ ingredient }) => {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div className={ burgerIngredientsStyle.card } onClick={() => setShowModal(true)}>
      {showModal && 
        <Modal onClose={() => setShowModal(false)} header="Детали ингредиента">
          <IngredientDetails data={ingredient}/>
        </Modal>}
      <img className={ `${burgerIngredientsStyle.image} ml-4 mr-4` } src={ ingredient.image } alt="фото" />
      <Counter className={ burgerIngredientsStyle.count } count={1} size="default" extraClass="m-1" />
      <div className={ `${burgerIngredientsStyle.price} mt-1 mb-1` }>
        <p>{ ingredient.price }</p>
        <CurrencyIcon />
      </div>
      <p>{ ingredient.name }</p>
    </div>
  );
}

IngredientsItem.propTypes = {
  ingredient : ingredientPropTypes.isRequired
};

const BurgersIngredients = (props) => {
    const [current, setCurrent] = React.useState('one')
    const buns = props.ingredients.filter((el) => el.type === "bun"),
          sauces = props.ingredients.filter((el) => el.type === "sauce"),
          mains = props.ingredients.filter((el) => el.type === "main");

    const scrollElement = {
      'one': document.querySelector('#one'),
      'two': document.querySelector('#two'),
      'three': document.querySelector('#three')
    }

    const tabSelect = (tab) => {
      setCurrent(tab);
      if (tab && scrollElement[tab]) scrollElement[tab].scrollIntoView({ behavior: "smooth" });
    };

    return (
      <div>
        <h1 className="text text_type_main-large pt-10 pb-5">
          Соберите бургер
        </h1>
        <div style={{ display: 'flex' }}>
          <Tab value="one" active={current === 'one'} onClick={tabSelect}>
            Булки
          </Tab>
          <Tab value="two" active={current === 'two'} onClick={tabSelect}>
            Соусы
          </Tab>
          <Tab value="three" active={current === 'three'} onClick={tabSelect}>
            Начинки
          </Tab>
        </div>
        <div className={ `${burgerIngredientsStyle.container} pt-10` }>
          <h2 className="text text_type_main-medium" id="one">
            Булки
          </h2>
          <ul className={ `${burgerIngredientsStyle.list} pt-6 pb-10` }>
            {buns.map((item, index) => (
              <li key={index}>
                <IngredientsItem ingredient={ item } />
              </li>
              ))
            }
          </ul>
          <h2 className="text text_type_main-medium" id="two">
            Соусы
          </h2>
          <ul className={ `${burgerIngredientsStyle.list} pt-6 pb-10` }>
            {sauces.map((item, index) => (
              <li key={index}>
                <IngredientsItem ingredient={ item } />
              </li>
              ))
            }
          </ul>
          <h2 className="text text_type_main-medium" id="three">
            Начинки
          </h2>
          <ul className={ `${burgerIngredientsStyle.list} pt-6 pb-10` }>
            {mains.map((item, index) => (
              <li key={index}>
                <IngredientsItem ingredient={ item } />
              </li>
              ))
            }
          </ul>
        </div>
      </div>
    )
  }

  BurgersIngredients.propTypes = {
     ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired
  };

export default BurgersIngredients;
