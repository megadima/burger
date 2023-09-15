import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { logout } from '../../services/redux/actions/logout';
import { useDispatch } from '../../services/hooks';
import styles from './ProfilePage.module.css';
import { useState } from 'react';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const defaultNavClassName = styles.tab + " text text_type_main-medium text_color_inactive";
  const activeNavClassName = styles.tab + " text text_type_main-medium " + styles.activeTabColor;
  const { pathname } = useLocation();

  const [prompt, setPrompt] = useState('В этом разделе вы можете изменить свои персональные данные')

  return (
    <div className={styles.wrapper}>
      <div className={styles.menu}>
        <NavLink onClick={() => setPrompt('В этом разделе вы можете изменить свои персональные данные')}
          to='/profile'
          className={() => pathname === '/profile' ? activeNavClassName : defaultNavClassName}>
          Профиль
        </NavLink>
        <NavLink onClick={() => setPrompt('В этом разделе вы можете просмотреть свою историю заказов')}
          to='/profile/orders'
          className={({ isActive }) => isActive ? activeNavClassName : defaultNavClassName}>
          История заказов
        </NavLink>
        <NavLink to='/login' className={({ isActive }) => isActive ? activeNavClassName : defaultNavClassName} onClick={() => dispatch(logout())}>
          Выход
        </NavLink>

        <p className={styles.prompt + " text text_type_main-default text_color_inactive"}>
          {prompt}
        </p>
      </div>
      <Outlet />
    </div>
  )
}

export default ProfilePage;