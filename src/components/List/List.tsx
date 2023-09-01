import styles from './List.module.css';
import React, { FC } from 'react';

type TListProps = {
  children: React.ReactNode,
  height: string,
  marginTop?: string,
  paddingRight?: string,
  gap?: string
}

const List: FC<TListProps> = ({children, height, marginTop, paddingRight, gap}) => {
  return (
    <div className={styles.orders} style={{
      height: height, 
      marginTop: marginTop, 
      paddingRight: paddingRight ?? '8px',
      gap: gap ?? '24px'
    }}>
      {children}
    </div>
  )
}

export default List