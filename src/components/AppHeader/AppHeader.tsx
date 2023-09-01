import styles from './AppHeader.module.css'
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink } from 'react-router-dom';
import { FC } from 'react';

const AppHeader: FC = () => {

  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className={styles.wrap}>
        <nav className={styles.nav}>
          <ul className={`${styles.list} ${styles.nav_side_parts}`}>
            <li>
              <NavLink to='/' className={`${styles.link} pt-4 pb-4`}>
                {({ isActive }) => (
                  <>
                    <div className={`${styles.icon} ml-5`}>
                      <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                    </div>
                    <span
                      className={
                        isActive ? `text text_type_main-default mr-5` : `text text_type_main-default text_color_inactive mr-5`
                      }
                    >
                      Конструктор
                    </span>
                  </>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to='feed' className={`${styles.link} pt-4 pb-4`}>
                {({ isActive }) => (
                  <>
                    <div className={`${styles.icon} ml-5`}>
                      <ListIcon type={isActive ? 'primary' : 'secondary'} />
                    </div>
                    <span
                      className={
                        isActive ? `text text_type_main-default mr-5` : `text text_type_main-default text_color_inactive mr-5`
                      }
                    >
                      Лента заказов
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          </ul>
          <Link to='/'><Logo /></Link> 
          <NavLink to='/profile' className={`${styles.link} ${styles.nav_side_parts} ${styles.lk} pt-4 pb-4`}>
            {({ isActive }) => (
              <>
                <div className={`${styles.icon} ml-5`}>
                  <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
                </div>
                <span
                  className={
                    isActive ? `text text_type_main-default mr-5` : `text text_type_main-default text_color_inactive mr-5`
                  }
                >
                  Личный кабинет
                </span>
              </>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
