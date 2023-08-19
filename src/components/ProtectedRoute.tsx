import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getUserData } from "../services/actions/user.js";
import React, { FC, useEffect } from 'react';

const ProtectedRoute: FC<{element: React.ReactElement; onlyNotAuth?: boolean}> = ({ element, onlyNotAuth }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  //@ts-ignore
  const {user, isGetUserRequest} = useSelector(store => store.user)
  //@ts-ignore
  const {isRefreshTokenRequest} = useSelector(store => store.refreshToken)

  useEffect(() => {
    //@ts-ignore
    dispatch(getUserData());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isGetUserRequest || isRefreshTokenRequest)
    return null;
    
  if (!onlyNotAuth) {
    return (
      user ? element : <Navigate to='/login' state={{fromPage: pathname}}/>
    )
  } else {
    return (
      !user ? element : <Navigate to='/' />
    )
  }
}

export default ProtectedRoute;