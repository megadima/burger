import { FC, useMemo } from 'react';
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './IngredientsItem.module.css';
import { useDrag } from 'react-dnd';
import { useNavigate } from 'react-router-dom';
import { TIngredient } from '../../services/types/data';
import { useSelector } from '../../services/hooks';

const IngredientsItem: FC<{ingredient: TIngredient}> = ({ ingredient }) => {
  const navigate = useNavigate();

  const bunInCart = useSelector(store => store.cart.bun)
  const fillingInCart = useSelector(store => store.cart.filling).map(elem => elem.item)
  const count = useMemo(()=>[bunInCart, bunInCart, ...fillingInCart].filter(elem => elem._id === ingredient._id).length, [bunInCart, fillingInCart, ingredient._id])

  const [,dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
  })

  return (
    <div ref={dragRef} className={styles.card} onClick={() => navigate(`/ingredients/${ingredient._id}`, {state: {isIndredientOpenedInModal: true}})}>
      <img className={`${styles.image} ml-4 mr-4`} src={ingredient.image} alt="фото" />
      {count>0 && <Counter count={count} size="default" extraClass="m-1" />}
      <div className={`${styles.price} mt-1 mb-1`}>
        <p>{ingredient.price}</p>
        <CurrencyIcon type='primary' />
      </div>
      <p>{ingredient.name}</p>
    </div>
  );
}

export default IngredientsItem;