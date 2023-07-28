import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import AppHeader from '../../components/AppHeader/AppHeader.jsx';
import { sendResetPassword } from '../../services/actions/resetPassword.js';
import styles from './AuthStyles.module.css';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const resetPasswordEmail = useSelector(store => store.forgotPassword.email)
  //если на прошлой странице был введен емаил

  const onPasswordChange = e => {
    setPassword(e.target.value);
  }

  const onVerificationCodeChange = e => {
    setVerificationCode(e.target.value)
  }

  const onSaveClickHandler = e => {
    dispatch(sendResetPassword(password, verificationCode))
    navigate('/')
  }
  return (
    <>
      <AppHeader />
      {
        resetPasswordEmail === '' ? <Navigate to='/forgot-password' /> :
        
        <div className={styles.wrapper}>
          <div className={styles.auth_fields_wrapper}>
            <p className={styles.fields_text + " text text_type_main-medium"}>Восстановление пароля</p>
            <PasswordInput placeholder='Введите новый пароль' onChange={onPasswordChange}/>
            <Input type='text' placeholder='Введите код из письма' onChange={onVerificationCodeChange}/>
            <Button htmlType="button" type="primary" size="medium" onClick={onSaveClickHandler}>
              Сохранить
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
              onClick={() => navigate('/login')}
            >
              Войти
            </Button>
          </div>
        </div>
      }
    </>
  )
}

export default ResetPasswordPage;