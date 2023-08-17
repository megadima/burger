import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Modal from '../Modal/Modal';
import styles from './IngredientDetails.module.css';


const IngredientDetails: FC = () => {
  const {ingredientId} = useParams();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const isModal = searchParams.get('isModal');
  
  //@ts-ignore
  const ingredient = useSelector(store => store.ingredients.ingredients.find(item => item._id===ingredientId))

  const content = 
    <div className={styles.content}>
    <img src={ingredient.image_large} alt="Фото продукта" />
    <h3 className='text text_type_main-medium'>{ingredient.name}</h3>
    <div className={`${styles.nutrients} text_color_inactive`}>
      <div className={styles.nutrient}>
        <p className=' text text_type_main_default '>Калории, ккал</p>
        <p className="text text_type_digits-default">{ingredient.calories}</p>
      </div>
      <div className={styles.nutrient}>
        <p className='text text_type_main_default '>Белки, г</p>
        <p className="text text_type_digits-default">{ingredient.proteins}</p>
      </div>
      <div className={styles.nutrient}>
        <p className='text text_type_main_default '>Жиры, г</p>
        <p className="text text_type_digits-default">{ingredient.fat}</p>
      </div>
      <div className={styles.nutrient}>
        <p className=' text text_type_main_default '>Углеводы, г</p>
        <p className="text text_type_digits-default">{ingredient.carbohydrates}</p>
      </div>
    </div>
  </div>;

  return (
    isModal
    ? 
      <Modal onClose={() => navigate('/')} header="Детали ингредиента">
        {content}
      </Modal> 
    :
    <div className={styles.ingredient_page__wrapper}>
      <h2 className={`text text_type_main-large`}>
        Детали ингредиента
      </h2>
      {content}
    </div>
  )
}
export default IngredientDetails;