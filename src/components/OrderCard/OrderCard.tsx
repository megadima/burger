import styles from './OrderCard.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import RoundIngredientIcon from '../RoundIngredientIcon/RoundIngredientIcon';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import { TWSOrder } from '../../services/types/data';
import { orderStatusColors, orderStatusTexts } from '../helpers/OrderDetailsStatuses';
import { useMemo } from 'react';
import { useSelector } from '../../services/hooks';

const OrderCard: FC<{ data: TWSOrder, withStatus: boolean }> = ({ data, withStatus }) => {

  const { ingredients, _id, status, number, createdAt, name } = data
  const allIngredients = useSelector(store => store.ingredients.ingredients)

  const imagesAmount = 6 //сколько картинок показываем

  const orderIngredientsImages = useMemo(() => ingredients.slice(0, imagesAmount).map((ingredientId) =>
    allIngredients.find((ingredient) => ingredientId === ingredient._id)?.image as string
    // eslint-disable-next-line
  ), [ingredients])

  const orderIngredientsPrices = useMemo(() => ingredients.map((ingredientId) =>
    allIngredients.find((ingredient) =>
      ingredientId === ingredient._id)?.price as number
    // eslint-disable-next-line
  ), [ingredients])

  const totalPrice = orderIngredientsPrices.reduce((acc, v) => acc + v)


  return (
    <Link to={_id} state={{ isOrderOpenedInModal: true }} className={styles.background}>
      <div className={styles.row}>
        <p className="text text_type_digits-default">#{number}</p>
        <FormattedDate date={new Date(createdAt)} className='text_color_inactive' />
      </div>
      <div>
        <div className={styles.row}>
          <p className="text text_type_main-medium">
            {name}
          </p>
        </div>
        {withStatus &&
          <p className="text text_type_main-default" style={
            { color: orderStatusColors[status], marginTop: '8px' }
          }>
            {orderStatusTexts[status]}
          </p>
        }
      </div>
      <div className={styles.content}>
        <div className={styles.ingredients_container}>
          {[...orderIngredientsImages].reverse().map((v, i) =>
            <RoundIngredientIcon image={v} key={i}
              text={i === 0 && ingredients.length > imagesAmount ? `${ingredients.length - orderIngredientsImages.length}` : ''}
            />
          )}
        </div>
        <div className={styles.price}>
          <p className="text text_type_digits-default">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>

      </div>
    </Link>
  )
}

export default OrderCard