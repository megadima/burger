import HomePage from '../../pages/HomePage.jsx';
import LoginPage from '../../pages/AuthPages/LoginPage.jsx';
import RegisterPage from '../../pages/AuthPages/RegisterPage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ForgotPasswordPage from '../../pages/AuthPages/ForgotPasswordPage.jsx';
import ResetPasswordPage from '../../pages/AuthPages/ResetPasswordPage.jsx';
import ProfilePage from '../../pages/ProfilePage.jsx';
import ProtectedRoute from '../ProtectedRoute.jsx';
import Profile from '../Profile/Profile.jsx';
import IngredientDetails from '../IngredientDetails/IngredientDetails.jsx';
import AppHeader from '../AppHeader/AppHeader.jsx';

function App() {
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
