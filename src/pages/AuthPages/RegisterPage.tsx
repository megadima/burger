import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/redux/actions/registration';
import { useDispatch, useSelector } from '../../services/hooks';
import styles from './AuthStyles.module.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const message = useSelector(store => store.registration.message)

  const onRegisterClickHandler: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    dispatch(register(email, password, name))
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.auth_fields_wrapper} onSubmit={onRegisterClickHandler}>
        <p className={styles.fields_text + " text text_type_main-medium"}>Регистрация</p>
        <Input placeholder='Имя' type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setName(e.target.value)} value={name} />
        <EmailInput onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setEmail(e.target.value)} value={email} />
        <PasswordInput onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setPassword(e.target.value)} value={password} />
        {message &&
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