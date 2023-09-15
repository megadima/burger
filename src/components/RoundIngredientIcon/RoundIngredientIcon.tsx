import styles from './RoundedIngredientIcon.module.css';
import { FC } from "react";

const RoundIngredientIcon: FC<{ image: string, alt?: string, text?: string }> = ({ image, alt, text }) => {
  return (
    <div className={styles.ingredient_image_border}>
      <div className={styles.ingredient_image_background}>
        <img className={styles.ingredient_image} src={image} alt={alt} />
        {text &&
          <div className={styles.text}>
            <p className="text text_type_digits-default">+{text}</p>
          </div>
        }
      </div>
    </div>
  )
}

export default RoundIngredientIcon