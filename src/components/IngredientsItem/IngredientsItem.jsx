import { useState } from 'react';
import { ingredientPropTypes } from '../../types/PropTypes';
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import styles from './IngredientsItem.module.css';

const IngredientsItem = ({ ingredient }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.card} onClick={() => setShowModal(true)}>
      {showModal &&
        <Modal onClose={() => setShowModal(false)} header="Детали ингредиента">
          <IngredientDetails data={ingredient} />
        </Modal>}
      <img className={`${styles.image} ml-4 mr-4`} src={ingredient.image} alt="фото" />
      <Counter className={styles.count} count={1} size="default" extraClass="m-1" />
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