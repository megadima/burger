import { FC, useEffect } from 'react';
import HomePage from '../../pages/HomePage/HomePage';
import LoginPage from '../../pages/AuthPages/LoginPage';
import RegisterPage from '../../pages/AuthPages/RegisterPage';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import ForgotPasswordPage from '../../pages/AuthPages/ForgotPasswordPage';
import ResetPasswordPage from '../../pages/AuthPages/ResetPasswordPage';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import ProtectedRoute from '../ProtectedRoute';
import Profile from '../Profile/Profile';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import AppHeader from '../AppHeader/AppHeader';
import { getIngredients } from '../../services/redux/actions/ingredients';
import { useDispatch } from '../../services/hooks';
import FeedPage from '../../pages/FeedPage/FeedPage';
import OrderDetailsPage from '../../pages/OrderDetailsPage/OrderDetailsPage';
import Modal from '../Modal/Modal';
import ProfileOrdersList from '../ProfileOrdersList/ProfileOrdersList';
import WithWebSocket from '../WithWebSocket';
import { WS_API } from '../../utils/burger-api';

const App: FC = () => {
  const dispatch = useDispatch()
  const location = useLocation();
  const navigate = useNavigate();

  const isIndredientOpenedInModal = location.state?.isIndredientOpenedInModal;
  const isOrderOpenedInModal = location.state?.isOrderOpenedInModal;

  useEffect(() => {
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
          <Route path='orders' element={<ProfileOrdersList />}>
            {isOrderOpenedInModal &&
              <Route path=':orderId' element={
                <Modal onClose={() => navigate(-1)}>
                  <OrderDetailsPage />
                </Modal>
              } />
            }
          </Route>
        </Route>
        {!isOrderOpenedInModal && <Route path='/profile/orders/:orderId' element={<ProtectedRoute element={<WithWebSocket url={WS_API}><OrderDetailsPage /></WithWebSocket>} />} />}

        <Route path='/feed' element={<FeedPage />}>
          {isOrderOpenedInModal &&
            <Route path=':orderId' element={
              <Modal onClose={() => navigate(-1)}>
                <OrderDetailsPage />
              </Modal>
            } />
          }
        </Route>
        {!isOrderOpenedInModal && <Route path='/feed/:orderId' element={<WithWebSocket url={`${WS_API}/all`}><OrderDetailsPage /></WithWebSocket>} />}

      </Routes>
    </div>
  );
}

export default App;
