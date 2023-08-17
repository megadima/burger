import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendEmail } from '../../services/actions/forgotPassword.js';
import styles from './AuthStyles.module.css';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const onRestoreClickHandler: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    //@ts-ignore
    dispatch(sendEmail(email))
    navigate('/reset-password', {state: {email: email}});
  }
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => setEmail(e.target.value);

  return (
    <div className={styles.wrapper}>
      <form className={styles.auth_fields_wrapper} onSubmit={onRestoreClickHandler}>
        <p className={styles.fields_text + " text text_type_main-medium"}>Восстановление пароля</p>
        <EmailInput placeholder='Укажите E-mail' onChange={onEmailChange} value={email} />
        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
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
          onClick={() =>
            navigate('/login')
          }
        >
          Войти
        </Button>
      </div>
    </div>
  )
}


export default ForgotPasswordPage;