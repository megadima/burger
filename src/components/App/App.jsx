import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgersIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { getIngredients } from '../../services/actions/ingredients.js';
function App() {

  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(getIngredients())
  }, [])

  const hasError = useSelector(store => store.ingredients.ingredientsFailed)
  const isLoading = useSelector(store => store.ingredients.ingredientsRequest);
  
  return (
    <div className="App">
      <AppHeader />
      <main className={`${style.burger_constructor_wrap} mb-10`} >
        <div className={style.burger_constructor}>
          {isLoading &&
            <p className={"text text_type_main-large"} style={{ margin: "0 auto" }}>
              Загрузка
            </p>
          }
          {hasError &&
            <p className={"text text_type_main-large"} style={{ margin: "0 auto" }}>
              Ошибка при получении данных с сервера!
            </p>
          }
          {!isLoading && !hasError &&
          <>
            <BurgersIngredients />
            <BurgerConstructor />
          </>
          }
        </div>
      </main>
    </div>
  );
}

export default App;
