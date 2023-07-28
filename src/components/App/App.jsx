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

function App() {
  return (
    <BrowserRouter>
      <div className="App"> 
        <Routes>
          <Route path='/' element={<HomePage />}>
            <Route path='ingredients/:ingredientId' element={<IngredientDetails />} />
          </Route>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/forgot-password' element={<ForgotPasswordPage />} />
          <Route path='/reset-password' element={<ResetPasswordPage />} />
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
