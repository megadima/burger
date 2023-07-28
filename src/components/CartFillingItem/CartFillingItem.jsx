import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from 'react-redux';
import { CHANGE_ITEM_POSITION, REMOVE_FROM_CART } from "../../services/actions/cart.js";
import { useDrag, useDrop } from 'react-dnd';
import styles from './CartFillingItem.module.css';
import { useRef } from "react";
import { CartElementTypes } from "../../types/PropTypes.js";

const CartFillingItem = ({ elem, index }) => {
  const dispatch = useDispatch();

  const key = elem.key

  const deleteCartItemHandler = (elem) => {
    dispatch({
      type: REMOVE_FROM_CART,
      ...elem
    })
  }

  const ref = useRef(null)
  const [{ handlerId }, drop] = useDrop({
    accept: 'cartItem',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      dispatch({
        type: CHANGE_ITEM_POSITION,
        oldIndex: dragIndex,
        newIndex: hoverIndex
      })
      item.index = hoverIndex
    },
  })
  const [, drag] = useDrag({
    type: 'cartItem',
    item: () => {
      return {key , index }
    },
  })
  drag(drop(ref))

  return (
    <li ref={ref} className={styles.item} key={index} data-handler-id={handlerId}>
      <DragIcon type="primary" />
      <div className={styles.constructor_element__wrapper}>
        <ConstructorElement
        text={elem.item.name}
        price={elem.item.price}
        thumbnail={elem.item.image_mobile}
        handleClose={() => deleteCartItemHandler(elem)}
        />
      </div>
    </li>
  )
}

export default CartFillingItem;

CartFillingItem.propTypes = CartElementTypes.isRequired;

