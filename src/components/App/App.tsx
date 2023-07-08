import { useState, useEffect } from 'react';
import style from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgersIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { getIngredients } from '../../utils/burger-api';
import { IngredientsContext } from '../../contexts/IngredientsContext';

function App() {
  const [state, setState] = useState({
    data: [],
    isLoading: false,
    hasError: false
  });

  const getData = () => {
    setState({...state, isLoading: true});
    getIngredients()
    .then(res => setState({ ...state, data: res.data, isLoading: false }))
    .catch(e => setState({ ...state, isLoading: false, hasError: true }));
  }

  useEffect(() => {
    getData();
  }, []);

  const {data, isLoading, hasError} = state;
  return (
      <div className="App">
        <AppHeader />
        <main className={`${style.burger_constructor_wrap} mb-10`} >
          <div className={ style.burger_constructor }>
          {isLoading && 
            <p className = {"text text_type_main-large"} style = {{margin: "0 auto"}}>
            Загрузка
            </p>
          }
          {hasError && 
            <p className = {"text text_type_main-large"} style = {{margin: "0 auto"}}>
            Ошибка при получении данных с сервера!
            </p>
          }
          {!isLoading && !hasError && data.length &&
            <IngredientsContext.Provider value={data}>
              <BurgersIngredients/>
              <BurgerConstructor />
            </IngredientsContext.Provider>
          }
          </div>
        </main>
      </div>
  );
}

export default App;
