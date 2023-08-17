import React, { FC, useMemo } from 'react';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from '../BurgerIngredients/BurgerIngredients.module.css';
import IngredientsItem from '../IngredientsItem/IngredientsItem';
import { useSelector } from 'react-redux';
import { BUN, MAIN, SAUCE } from '../helpers/IngredientCategories.js';
import { TIngredient} from '../../types/types';

const BurgersIngredients: FC = () => {

  //@ts-ignore
  const ingredients = useSelector(store => store.ingredients.ingredients)

  const [currentTab, setCurrentTab] = React.useState<string>('buns');
  const buns = useMemo(() => ingredients.filter((el: TIngredient): boolean => el.type === BUN), [ingredients])
  const sauces = useMemo(() => ingredients.filter((el: TIngredient): boolean => el.type === SAUCE), [ingredients])
  const mains = useMemo(() => ingredients.filter((el: TIngredient): boolean => el.type === MAIN), [ingredients])

  const scrollElement: {[name: string]: HTMLElement | null} = {
    'buns': document.querySelector('#buns'),
    'sauces': document.querySelector('#sauces'),
    'mains': document.querySelector('#mains')
  }

  const tabSelect = (tab: string): void => {
    const first: HTMLElement | null = document.getElementById('scrollList');
    const second: HTMLElement | null = scrollElement[tab];
    if ((first instanceof HTMLElement) && (second instanceof HTMLElement))
      first.scrollTop = second.offsetTop-285;
  };

  const countScrollDistance = (source: number, target: number): number => {
    return Math.abs(target - source)
  }

  const scrollHandler = (e: React.UIEvent<HTMLElement>): void => {
    const target = e.target as HTMLElement;
    type TClosest = {
      key: string;
      distance: number | null;
    }
    const targetPosition: number = target.getBoundingClientRect().y

    let closest: TClosest = {
      key: 'buns',
      distance: null
    };

    Object.entries(scrollElement)
      .map(([tabName, value]) => value instanceof Element ? [tabName, value.getBoundingClientRect().y] : [tabName, null])
      .forEach(([tabName, itemPosition]) => {
        
        if (typeof itemPosition === 'number') {
          const distance: number = countScrollDistance(targetPosition, itemPosition)
          console.log(closest, distance)
          if ((!closest.distance || distance < closest.distance) && (typeof tabName === "string")) {
            closest = {key: tabName, distance}
        }
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
          {buns.map((item: TIngredient, index: number) => (
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
          {sauces.map((item: TIngredient, index: number) => (
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
          {mains.map((item: TIngredient, index: number) => (
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
