import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import styles from './CartFillingItem.module.css';
import { FC, useRef } from "react";
import { TCartElement } from "../../services/types/data";
import { CHANGE_ITEM_POSITION, REMOVE_FROM_CART } from "../../services/redux/constatns/actionTypes";

type draggableItemIdentifiers = {
  key: string;
  index: number;
}

const CartFillingItem: FC<{elem: TCartElement, index: number}>  = ({ elem, index }) => {
  const dispatch = useDispatch();

  const deleteCartItemHandler = (elem: TCartElement): void => {
    dispatch({
      type: REMOVE_FROM_CART,
      ...elem
    })
  }

  const ref = useRef<HTMLLIElement>(null)
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
      const dragIndex = (item as draggableItemIdentifiers).index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const clientOffset = monitor.getClientOffset()
      if (clientOffset !== null) {
        const hoverBoundingRect = ref.current.getBoundingClientRect()
        const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
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
        });
        (item as draggableItemIdentifiers).index = hoverIndex
      }
    },
  })
  const [, drag] = useDrag({
    type: 'cartItem',
    item: (): draggableItemIdentifiers => {
      return {key: elem.key, index}
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

