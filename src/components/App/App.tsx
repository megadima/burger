import { FC, useEffect } from 'react';
import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/AuthPages/LoginPage';
import RegisterPage from '../../pages/AuthPages/RegisterPage';
import { Routes, Route, useLocation } from 'react-router-dom';
import ForgotPasswordPage from '../../pages/AuthPages/ForgotPasswordPage';
import ResetPasswordPage from '../../pages/AuthPages/ResetPasswordPage';
import ProfilePage from '../../pages/ProfilePage';
import ProtectedRoute from '../ProtectedRoute';
import Profile from '../Profile/Profile';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import AppHeader from '../AppHeader/AppHeader';
import { getIngredients } from '../../services/actions/ingredients';
import { useDispatch } from 'react-redux';

const App: FC = () => {
  const dispatch = useDispatch()
  let location = useLocation();

  const isIndredientOpenedInModal = location.state?.isIndredientOpenedInModal;
  
  useEffect(() => {
    //@ts-ignore
    dispatch(getIngredients())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
      <AppHeader />
      <Routes>
        <Route path='/' element={<HomePage />}>
          {isIndredientOpenedInModal && <Route path='ingredients/:ingredientId' element={<IngredientDetails />} />}
        </Route>
        {!isIndredientOpenedInModal && <Route path='/ingredients/:ingredientId' element={<IngredientDetails />} />}
        <Route path='/login' element={<ProtectedRoute element={<LoginPage />} onlyNotAuth />} />
        <Route path='/register' element={<ProtectedRoute element={<RegisterPage />} onlyNotAuth />} />
        <Route path='/forgot-password' element={<ProtectedRoute element={<ForgotPasswordPage />} onlyNotAuth />} />
        <Route path='/reset-password' element={<ProtectedRoute element={<ResetPasswordPage />} onlyNotAuth />} />
        <Route path='/profile' element={<ProtectedRoute element={<ProfilePage />} />}>
          <Route index element={<Profile />} />
          <Route path='orders' element={null}>
            <Route path=':orderId' element={null} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
