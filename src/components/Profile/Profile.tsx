import { FC, useState } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from 'react-redux'
import styles from './Profile.module.css'

const Profile: FC = () => {
  //@ts-ignore
  const {user} = useSelector(store => store.user)

  const [name, setName] = useState<string>(user.name);
  const [email, setEmail] = useState<string>(user.email);
  const [password, setPassword] = useState<string>('********');

  return (
    <div className={styles.inputs} >
      <Input placeholder='Имя' icon='EditIcon' value={name} onChange={e => setName(e.target.value)} />
      <Input placeholder='Логин' icon='EditIcon' value={email} onChange={e => setEmail(e.target.value)} />
      <Input type='password' placeholder='Пароль' icon='EditIcon' value={password} onChange={e => setPassword(e.target.value)}/>
    </div >
  )

}

export default Profile;