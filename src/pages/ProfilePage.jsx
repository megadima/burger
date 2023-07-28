import { useDispatch } from 'react-redux';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import AppHeader from '../components/AppHeader/AppHeader.jsx';
import { logout } from '../services/actions/logout.js';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const defaultNavClassName = styles.tab + " text text_type_main-medium text_color_inactive";
  const activeNavClassName = styles.tab + " text text_type_main-medium " + styles.activeTabColor;
  const {pathname} = useLocation();

  const onLogoutClickHandler = (e) => {
    dispatch(logout());
  }

  return (
    <>
      <AppHeader />
      <div className={styles.wrapper}>
        <div className={styles.menu}>
          <NavLink to='/profile' className={() => pathname==='/profile' ? activeNavClassName : defaultNavClassName}>
            Профиль
          </NavLink>
          <NavLink to='/profile/orders' className={ ({ isActive }) => isActive ? activeNavClassName : defaultNavClassName}>
            История заказов
          </NavLink>
          <NavLink to='/login' className={ ({ isActive }) => isActive ? activeNavClassName : defaultNavClassName} onClick={onLogoutClickHandler}>
            Выход
          </NavLink>

          <p className={styles.prompt + " text text_type_main-default text_color_inactive"}>
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <Outlet />
      </div>
    </>
  )
}

export default ProfilePage;