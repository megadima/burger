import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import AppHeader from '../../components/AppHeader/AppHeader.jsx';
import { sendEmail } from '../../services/actions/forgotPassword.js';
import styles from './AuthStyles.module.css';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user.user);

  const [email, setEmail] = useState('');

  const onRestoreClickHandler = e => {
      dispatch(sendEmail(email));
      navigate('/reset-password');
  }

  const onEmailChange = e => setEmail(e.target.value);

  return (
    <>
      <AppHeader />
      {user ? <Navigate to='/' /> : (
        <div className={styles.wrapper}>
          <div className={styles.auth_fields_wrapper} >
            <p className={styles.fields_text + " text text_type_main-medium"}>Восстановление пароля</p>
            <EmailInput placeholder='Укажите E-mail' onChange={onEmailChange} />
            <Button htmlType="submit" type="primary" size="medium" onClick={onRestoreClickHandler}>
              Восстановить
            </Button>
          </div>
          <div className={styles.navigation_row}>
            <p className={styles.fields_text + " text text_type_main-default text_color_inactive"}>
              Вспомнили пароль?
            </p>
            <Button
              htmlType="button"
              type="secondary"
              size="medium"
              extraClass={styles.secondary_button}
              onClick={() =>
                navigate('/login')
              }
            >
              Войти
            </Button>
          </div>
        </div>
      )}
    </>
  )
}


export default ForgotPasswordPage;