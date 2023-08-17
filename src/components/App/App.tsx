import { FC } from 'react';
import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/AuthPages/LoginPage';
import RegisterPage from '../../pages/AuthPages/RegisterPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ForgotPasswordPage from '../../pages/AuthPages/ForgotPasswordPage';
import ResetPasswordPage from '../../pages/AuthPages/ResetPasswordPage';
import ProfilePage from '../../pages/ProfilePage';
import ProtectedRoute from '../ProtectedRoute';
import Profile from '../Profile/Profile';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import AppHeader from '../AppHeader/AppHeader';

const App: FC = () => {

  return (
    <BrowserRouter>
      <div className="App"> 
      <AppHeader />
        <Routes>
          <Route path='/' element={<HomePage />}>
            <Route path='ingredients/:ingredientId' element={<IngredientDetails />} />
          </Route>
          <Route path='/login' element={<ProtectedRoute element={ <LoginPage />} onlyNotAuth /> } />
          <Route path='/register' element={<ProtectedRoute element={ <RegisterPage />} onlyNotAuth /> } />
          <Route path='/forgot-password' element={<ProtectedRoute element={ <ForgotPasswordPage />} onlyNotAuth /> } />
          <Route path='/reset-password' element={<ProtectedRoute element={ <ResetPasswordPage />} onlyNotAuth /> } />
          <Route path='/profile' element={ <ProtectedRoute element={ <ProfilePage /> } /> }>
            <Route index element={ <Profile /> } />
            <Route path='orders' element={ null }>
              <Route path=':orderId' element={ null }/>
            </Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
