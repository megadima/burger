import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { login } from '../../services/redux/actions/login';
import styles from './AuthStyles.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';

const LoginPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const fromPage = location.state?.fromPage;

  const message = useSelector(store => store.login.message)
  const [inputEmail, setInputEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputEmail(e.target.value)
  }

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value)
  }

  const onLoginClickHandler: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    const loginState = dispatch(login(inputEmail, password));
    loginState.then((state: boolean) => {
      if (state) {
        navigate(fromPage || -1) // -1 для возвращения на страницу, которая не обернута в protectedRoute
      }
    })
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.auth_fields_wrapper} onSubmit={onLoginClickHandler}>
        <p className={styles.fields_text + " text text_type_main-medium"}>Вход</p>
        <EmailInput onChange={onEmailChange} value={inputEmail} />
        <PasswordInput onChange={onPasswordChange} value={password} />
        {message &&
          <p className={styles.fields_text + " text text_type_main-default text_color_inactive"}>
            {message}
          </p>
        }
        <Button htmlType="submit" type="primary" size="medium">
          Войти
        </Button>
      </form>
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
  )
}

export default LoginPage;