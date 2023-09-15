import styles from './HomePage.module.css';
import BurgersIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import { Outlet } from "react-router-dom";
import { useSelector } from '../../services/hooks';

const HomePage = () => {
  const hasError = useSelector(store => store.ingredients.ingredientsFailed)
  const isLoading = useSelector(store => store.ingredients.ingredientsRequest);

  return (
    <> 
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
        <div style={{position:'absolute', zIndex: '2'}}>
          <Outlet />
        </div>
    </>
  )
}

export default HomePage;