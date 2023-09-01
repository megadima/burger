import { FC } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import Modal from '../Modal/Modal';
import styles from './IngredientDetails.module.css';


const IngredientDetails: FC = () => {
  const { ingredientId } = useParams()
  const navigate = useNavigate()
  const location = useLocation();

  const isModal = location.state?.isIndredientOpenedInModal

  const ingredient = useSelector(store => store.ingredients.ingredients.find(item => item._id === ingredientId))
  const isLoading = useSelector(store => store.ingredients.ingredientsRequest)

  let content = <></>;
  if (isLoading) {
    content = (
      <p className={"text text_type_main-default"} style={{ margin: "0 auto" }}>
        Загрузка
      </p>
    )
  } else if (ingredient) {
    content = (
      <div className={styles.content}>
        <img  className={styles.ingredient_image} src={ingredient.image_large} alt="Фото продукта" />
        <h3 className={styles.ingredient_name + 'text text_type_main-medium'}>{ingredient.name}</h3>
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
      </div>
    )
  }

  return (
    isModal
      ?
      <Modal onClose={() => navigate(-1)} header="Детали ингредиента">
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