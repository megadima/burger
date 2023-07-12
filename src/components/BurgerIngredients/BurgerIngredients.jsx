import React, { useContext, useMemo } from 'react';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from '../BurgerIngredients/BurgerIngredients.module.css';
import { IngredientsContext } from '../../contexts/IngredientsContext.js';
import IngredientsItem from '../IngredientsItem/IngredientsItem.jsx';

const BurgersIngredients = () => {

  const ingredients = useContext(IngredientsContext);

  const [current, setCurrent] = React.useState('one');
  const buns = useMemo(() => ingredients.filter((el) => el.type === "bun"), [ingredients])
  const sauces = useMemo(() => ingredients.filter((el) => el.type === "sauce"), [ingredients])
  const mains = useMemo(() => ingredients.filter((el) => el.type === "main"), [ingredients])

  const scrollElement = {
    'one': document.querySelector('#one'),
    'two': document.querySelector('#two'),
    'three': document.querySelector('#three')
  }

  const tabSelect = (tab) => {
    setCurrent(tab);
    document.getElementById('scrollList').scrollTop = scrollElement[tab].offsetTop-285;
  };

  return (
    <div>
      <h1 className="text text_type_main-large pt-10 pb-5">
        Соберите бургер
      </h1>
      <div className={styles.tabs__wrapper}>
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
      <div className={`${styles.container} pt-10`} id="scrollList">
        <h2 className="text text_type_main-medium" id="one">
          Булки
        </h2>
        <ul className={`${styles.list} pt-6 pb-10`}>
          {buns.map((item, index) => (
            <li key={index}>
              <IngredientsItem ingredient={item} />
            </li>
          ))
          }
        </ul>
        <h2 className="scrollListHeader text text_type_main-medium" id="two">
          Соусы
        </h2>
        <ul className={`${styles.list} pt-6 pb-10`}>
          {sauces.map((item, index) => (
            <li key={index}>
              <IngredientsItem ingredient={item} />
            </li>
          ))
          }
        </ul>
        <h2 className="text text_type_main-medium" id="three">
          Начинки
        </h2>
        <ul className={`${styles.list} pt-6 pb-10`}>
          {mains.map((item, index) => (
            <li key={index}>
              <IngredientsItem ingredient={item} />
            </li>
          ))
          }
        </ul>
      </div>
    </div>
  )
}


export default BurgersIngredients;
