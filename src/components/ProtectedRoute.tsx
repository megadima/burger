import { Navigate, useLocation } from "react-router-dom";
import { getUserData } from "../services/redux/actions/user";
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "../services/hooks";

const ProtectedRoute: FC<{ element: React.ReactElement; onlyNotAuth?: boolean }> = ({ element, onlyNotAuth }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation()

  const { user, isGetUserRequest } = useSelector(store => store.user)
  const { refreshTokenRequest } = useSelector(store => store.refreshToken)
  const [userUpdated, setUserUpdated] = useState(false)

  useEffect(() => {
    dispatch(getUserData())
    setUserUpdated(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isGetUserRequest || refreshTokenRequest || !userUpdated) {
    return (
      <p className={'text text_type_main-medium'} style={{ textAlign: 'center' }}>Загрузка...</p>
    );
  }

  if (onlyNotAuth) {
    return (
      !user ? element : <Navigate to='/' replace />
    )
  }

  return (
    user ? element : <Navigate to='/login' replace state={{ fromPage: pathname }} />
  )
}

export default ProtectedRoute;