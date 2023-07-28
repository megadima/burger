import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../services/actions/ingredients.js";
import { useEffect } from 'react';
import styles from './HomePage.module.css';
import BurgersIngredients from "../components/BurgerIngredients/BurgerIngredients.jsx";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor.jsx";
import AppHeader from "../components/AppHeader/AppHeader.jsx";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const isModal = searchParams.get('isModal');

  //при переходе на конкретный адрес введенный вручную
  //компонент будет ререндериться 
  //и мы можем отловить, нужно ли рендерить окно конструктора
  const isIngredientPagePurposefullyOpened = (useLocation().pathname.split('/')[1] === 'ingredients') && (isModal===null) ;
  
  useEffect(()=> {
    dispatch(getIngredients())
  }, [])

  const hasError = useSelector(store => store.ingredients.ingredientsFailed)
  const isLoading = useSelector(store => store.ingredients.ingredientsRequest);

  return (
    <>
    <AppHeader />
    { !isIngredientPagePurposefullyOpened && 
      <main className={`${styles.burger_constructor_wrap} mb-10`} >
        <div className={styles.burger_constructor} id="homepage">
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
    }
      <div style={{position:'absolute', zIndex: '2'}}>
        <Outlet />
      </div>
    </>
  )
}

export default HomePage;