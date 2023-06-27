import { ingredientPropTypes } from '../../types/PropTypes.js';
import styles from './IngredientDetails.module.css';


const IngredientDetails = ({ data }) => {
  return (
    <div className={styles.content}>
      <img src={data.image_large} alt="Фото продукта" />
      <h3 className='text text_type_main-medium'>{data.name}</h3>
      <div className={`${styles.nutrients} text_color_inactive`}>
        <div className={styles.nutrie}>
          <p className=' text text_type_main_default '>Калории, ккал</p>
          <p className="text text_type_digits-default">{data.calories}</p>
        </div>
        <div className={styles.nutrie}>
          <p className='text text_type_main_default '>Белки, г</p>
          <p className="text text_type_digits-default">{data.proteins}</p>
        </div>
        <div className={styles.nutrie}>
          <p className='text text_type_main_default '>Жиры, г</p>
          <p className="text text_type_digits-default">{data.fat}</p>
        </div>
        <div className={styles.nutrie}>
          <p className=' text text_type_main_default '>Углеводы, г</p>
          <p className="text text_type_digits-default">{data.carbohydrates}</p>
        </div>
      </div>

    </div>
  )
}

IngredientDetails.propTypes = {
  data: ingredientPropTypes.isRequired
};

export default IngredientDetails;