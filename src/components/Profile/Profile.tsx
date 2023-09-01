import { FC, useState } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './Profile.module.css'
import { useSelector } from '../../services/hooks';

const Profile: FC = () => {
  const { user } = useSelector(store => store.user)

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState('********');

  return (
    <form className={styles.inputs} >
      <Input placeholder='Имя' icon='EditIcon' value={name ?? ''} onChange={e => setName(e.target.value)} />
      <Input placeholder='Логин' icon='EditIcon' value={email ?? ''} onChange={e => setEmail(e.target.value)} />
      <Input type='password' placeholder='Пароль' icon='EditIcon' value={password} onChange={e => setPassword(e.target.value)} />
    </form >
  )

}

export default Profile;