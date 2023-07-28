import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUserData } from "../services/actions/user.js";
import { useEffect } from 'react';
import AppHeader from "./AppHeader/AppHeader.jsx";

const ProtectedRoute = ({ element }) => {
  const dispatch = useDispatch();
  const {user, isGetUserRequest} = useSelector(store => store.user)
  const {isRefreshTokenRequest} = useSelector(store => store.refreshToken)

  useEffect(() => {
    dispatch(getUserData());
  }, [])

  if (isGetUserRequest || isRefreshTokenRequest) 
    return <AppHeader />;

  return (
    user ? element : <Navigate to='/login'/>
    // element
  )
}

export default ProtectedRoute;