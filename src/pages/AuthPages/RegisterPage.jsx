import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { register } from '../../services/actions/registration.js';
import styles from './AuthStyles.module.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const user = useSelector (store => store.user.user)
  const message = useSelector(store => store.registration.message )

  const onRegisterClickHandler = e => {
    e.preventDefault();
    dispatch(register(email, password, name))
  }

  return (
    user ? <Navigate to='/'/> :

      <div className={styles.wrapper}>
        <form className={styles.auth_fields_wrapper} onSubmit={onRegisterClickHandler}>
          <p className={styles.fields_text + " text text_type_main-medium"}>Регистрация</p>
          <Input placeholder='Имя' type="text" onChange={e => setName(e.target.value)}/>
          <EmailInput onChange={e => setEmail(e.target.value)}/>
          <PasswordInput onChange={e => setPassword(e.target.value)}/>
          {message !== '' && 
            <p className={styles.fields_text + " text text_type_main-default text_color_inactive"}>
              {message}
            </p>
          }
          <Button 
            htmlType="submit" 
            type="primary" 
            size="medium" 
          >
            Зарегистрироваться
          </Button>
        </form>
        <div className={styles.navigation_row}>
          <p className={styles.fields_text + " text text_type_main-default text_color_inactive"}>
            Уже загеристрированы?
          </p>
          <Button 
            htmlType="button" 
            type="secondary" 
            size="medium" 
            extraClass={styles.secondary_button} 
            onClick={() => navigate('/login')}
          >
            Войти
          </Button>
        </div>
      </div>
  )
}

export default RegisterPage;