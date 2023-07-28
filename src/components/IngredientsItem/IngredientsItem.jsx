import { useMemo, useState } from 'react';
import { ingredientPropTypes } from '../../types/PropTypes';
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import styles from './IngredientsItem.module.css';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';

const IngredientsItem = ({ ingredient }) => {
  const [showModal, setShowModal] = useState(false);
  const bunInCart = useSelector(store => store.cart.bun)
  const fillingInCart = useSelector(store => store.cart.filling.map(elem => elem.item))
  const count = useMemo(()=>[bunInCart, bunInCart, ...fillingInCart].filter(elem => elem._id === ingredient._id).length, [bunInCart, fillingInCart, ingredient._id])

  const [,dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
  })

  return (
    <div ref={dragRef} className={styles.card} onClick={() => setShowModal(true)}>
      {showModal &&
        <Modal onClose={() => setShowModal(false)} header="Детали ингредиента">
          <IngredientDetails data={ingredient} />
        </Modal>}
      <img className={`${styles.image} ml-4 mr-4`} src={ingredient.image} alt="фото" />
      {count>0 && <Counter className={styles.count} count={count} size="default" extraClass="m-1" />}
      <div className={`${styles.price} mt-1 mb-1`}>
        <p>{ingredient.price}</p>
        <CurrencyIcon />
      </div>
      <p>{ingredient.name}</p>
    </div>
  );
}

IngredientsItem.propTypes = {
  ingredient: ingredientPropTypes.isRequired
};

export default IngredientsItem;