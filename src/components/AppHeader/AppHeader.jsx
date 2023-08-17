import styles from './AppHeader.module.css'
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import PropTypes from "prop-types";

const AppHeader = () => {

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
              <NavLink to='order_feed' className={`${styles.link} pt-4 pb-4`}>
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
          <Logo />
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

AppHeader.propTypes = PropTypes.shape({
  activeTabId: PropTypes.string.isRequired
})

export default AppHeader;
