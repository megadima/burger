import { Navigate, useLocation } from "react-router-dom";
import { getUserData } from "../services/redux/actions/user";
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from "../services/hooks";

const ProtectedRoute: FC<{element: React.ReactElement; onlyNotAuth?: boolean}> = ({ element, onlyNotAuth }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const {user, isGetUserRequest} = useSelector(store => store.user)
  const {refreshTokenRequest} = useSelector(store => store.refreshToken)

  useEffect(() => {
    dispatch(getUserData());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isGetUserRequest || refreshTokenRequest) {
    return (
      <p className={'text text_type_main-medium'} style={{textAlign: 'center'}}>Загрузка...</p>
    );
  }
    
  if (!onlyNotAuth) {
    return (
      user ? element : <Navigate to='/login' replace state={{fromPage: pathname}}/>
    )
  } else {
    return (
      !user ? element : <Navigate to='/' replace/>
    )
  }
}

export default ProtectedRoute;