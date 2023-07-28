import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { login } from '../../services/actions/login.js';
import styles from './AuthStyles.module.css';
import { useState } from 'react';
import AppHeader from '../../components/AppHeader/AppHeader.jsx';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user.user)
  const message = useSelector(store => store.login.message)

  const [inputEmail, setInputEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailChange = e => {
    setInputEmail(e.target.value)
  }

  const onPasswordChange = e => {
    setPassword(e.target.value)
  }

  const onLoginClickHandler = e => {
    dispatch(login(inputEmail, password));
  }

  return (
    <>
    <AppHeader />
    {
      user ? <Navigate to='/' /> : 
    
      <div className={styles.wrapper}>
        <div className={styles.auth_fields_wrapper}>
          <p className={styles.fields_text + " text text_type_main-medium"}>Вход</p>
          <EmailInput onChange={onEmailChange}/>
          <PasswordInput onChange={onPasswordChange}/>
          {message !== '' &&
            <p className={styles.fields_text + " text text_type_main-default text_color_inactive"}>
              {message}
            </p>
          }
          <Button htmlType="button" type="primary" size="medium" onClick={onLoginClickHandler}>
            Войти
          </Button>
        </div>
        <div className={styles.navigation_row}>
          <p className={styles.fields_text + " text text_type_main-default text_color_inactive"}>
            Вы - новый пользователь?
          </p>
          <Button 
            htmlType="button" 
            type="secondary" 
            size="medium" 
            extraClass={styles.secondary_button} 
            onClick={() => navigate('/register')}
          >
            Зарегистрироваться
          </Button>
        </div>
        <div className={styles.navigation_row}>
          <p className={styles.fields_text + " text text_type_main-default text_color_inactive"}>
            Забыли пароль?
          </p>
          <Button 
            htmlType="button" 
            type="secondary" 
            size="medium" 
            extraClass={styles.secondary_button} 
            onClick={() => navigate('/forgot-password')}
          >
            Восстановить пароль
          </Button>
        </div>
      </div>
    }
    </>
  )
}

export default LoginPage;