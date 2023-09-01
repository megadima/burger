import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { sendResetPassword } from '../../services/actions/resetPassword.js';
import styles from './AuthStyles.module.css';

const ResetPasswordPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const email = location.state?.email
  //если на прошлой странице был введен емаил

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  }

  const onVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setVerificationCode(e.target.value)
  }
  
  const onSaveClickHandler: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    //@ts-ignore
    dispatch(sendResetPassword(password, verificationCode))
    navigate('/')
  }

  
  if (!email) return <Navigate to='/forgot-password' />

  return (
      <div className={styles.wrapper}>
        <form className={styles.auth_fields_wrapper} onSubmit={onSaveClickHandler}>
          <p className={styles.fields_text + " text text_type_main-medium"}>Восстановление пароля</p>
          <PasswordInput placeholder='Введите новый пароль' onChange={onPasswordChange} value={password} />
          <Input type='text' placeholder='Введите код из письма' onChange={onVerificationCodeChange} value={verificationCode} />
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </form>
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
  )
}

export default ResetPasswordPage;