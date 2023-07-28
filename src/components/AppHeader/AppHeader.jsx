import styles from './AppHeader.module.css'
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { useEffect } from 'react';

const AppHeader = () => {

  const linkToNodeId = {
    '/': 'constructorTab',
    'profile': 'profileTab',
    'login': 'profileTab'
  }
  const tabAddress = window.location.href.split('/')[3] || '/';

  const activeTabId = linkToNodeId[tabAddress];

  useEffect(() => {
    if (activeTabId) {
      const activeTabNode = document.getElementById(activeTabId);
      activeTabNode.className = activeTabNode.className.replace('text_color_inactive', '')
    }
  }, [])

  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className={styles.wrap}>
        <nav className={styles.nav}>
          <ul className={`${styles.list} ${styles.nav_side_parts}`}>
            <li>
              <Link to='/' className={`${styles.link} pt-4 pb-4`}>
                <div className={`${styles.icon} ml-5`}>
                  <BurgerIcon type={ 
                    activeTabId==='constructorTab' ? 'primary' : 'secondary' 
                  } />
                </div>
                <span className={`text text_type_main-default text_color_inactive mr-5`} id='constructorTab' >Конструктор</span>
              </Link>
            </li>
            <li>
              <Link to="/" className={`${styles.link} pt-4 pb-4`}>
                <div className={`${styles.icon} ml-5`}>
                  <ListIcon type={
                    activeTabId==='orderFeedTab' ? 'primary' : 'secondary'
                  } />
                </div>
                <span className={`text text_type_main-default text_color_inactive mr-5`} id='orderFeedTab'>Лента заказов</span>
              </Link>
            </li>
          </ul>
          <Logo />
          <Link to='/profile' className={`${styles.link} ${styles.nav_side_parts} ${styles.lk} pt-4 pb-4`}>
            <div className={`${styles.icon} ml-5`}>
              <ProfileIcon type={
                activeTabId==='profileTab' ? 'primary' : 'secondary'
              } />
            </div>
            <span className={`text text_type_main-default text_color_inactive mr-5`} id='profileTab' >Личный кабинет</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

AppHeader.propTypes = PropTypes.shape({
  activeTabId: PropTypes.string.isRequired
})

export default AppHeader;
