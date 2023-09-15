import styles from './List.module.css';
import React, { FC } from 'react';

type TListProps = {
  children: React.ReactNode;
  className: string
}

const List: FC<TListProps> = ({children, className}) => {
  return (
    <div className={[className, styles.orders].join(' ')}>
      {children}
    </div>
  )
}

export default List