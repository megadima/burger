import React, { useMemo } from 'react';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from '../BurgerIngredients/BurgerIngredients.module.css';
import IngredientsItem from '../IngredientsItem/IngredientsItem.jsx';
import { useSelector } from 'react-redux';
import { BUN, MAIN, SAUCE } from '../helpers/IngredientCategories.js';

const BurgersIngredients = () => {

  const ingredients = useSelector(store => store.ingredients.ingredients)

  const [currentTab, setCurrentTab] = React.useState('buns');
  const buns = useMemo(() => ingredients.filter((el) => el.type === BUN), [ingredients])
  const sauces = useMemo(() => ingredients.filter((el) => el.type === SAUCE), [ingredients])
  const mains = useMemo(() => ingredients.filter((el) => el.type === MAIN), [ingredients])

  const scrollElement = {
    'buns': document.querySelector('#buns'),
    'sauces': document.querySelector('#sauces'),
    'mains': document.querySelector('#mains')
  }

  const tabSelect = (tab) => {
    document.getElementById('scrollList').scrollTop = scrollElement[tab].offsetTop-285;
  };

  const countScrollDistance = (source, target) => {
    return Math.abs(target - source)
  }

  const scrollHandler = ({ target }) => {
    const targetPosition = target.getBoundingClientRect().y

    let closest

    Object.entries(scrollElement)
      .map(([key, value]) => [key, value.getBoundingClientRect().y])
      .forEach(([key, itemPosition]) => {
      const distance = countScrollDistance(targetPosition, itemPosition)
      if (!closest || distance < closest.distance) {
        closest = { key, distance }
      }
    })

    setCurrentTab(closest.key)
  }

  return (
    <>
      <h1 className={styles.title+" text text_type_main-large mt-10"}>
        Соберите бургер
      </h1>
    <div>
      <div className={styles.tabs__wrapper + " mt-5"}>
        <Tab value="buns" active={currentTab === 'buns'} onClick={tabSelect}>
          Булки
        </Tab>
        <Tab value="sauces" active={currentTab === 'sauces'} onClick={tabSelect}>
          Соусы
        </Tab>
        <Tab value="mains" active={currentTab === 'mains'} onClick={tabSelect}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.container} pt-10`} id="scrollList" onScroll={ scrollHandler } >
        <h2 className="text text_type_main-medium" id="buns">
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
        <h2 className="scrollListHeader text text_type_main-medium" id="sauces">
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
        <h2 className="text text_type_main-medium" id="mains">
          Начинки
        </h2>
        <ul className={`${styles.list} pt-6 pb-10`}>
          {mains.map((item, index) => (
            <li key={index}>
              <IngredientsItem ingredient={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  )
}


export default BurgersIngredients;
