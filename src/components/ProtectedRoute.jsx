import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUserData } from "../services/actions/user.js";
import { useEffect } from 'react';

const ProtectedRoute = ({ element, onlyNotAuth }) => {
  const dispatch = useDispatch();
  const {user, isGetUserRequest} = useSelector(store => store.user)
  const {isRefreshTokenRequest} = useSelector(store => store.refreshToken)

  useEffect(() => {
    dispatch(getUserData());
  }, [])

  if (!onlyNotAuth) {
    if (isGetUserRequest || isRefreshTokenRequest) 
      return null;
    return (
      user ? element : <Navigate to='/login'/>
    )
  } else {
    return (
      !user ? element : <Navigate to='/'/>
    )
  }
}

export default ProtectedRoute;