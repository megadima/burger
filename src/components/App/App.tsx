import React from 'react';
import logo from '../../logo.svg';
import style from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgersIngredients from '../BurgerIngredients/BurgerIngredients';
import { api } from '../../utils/data';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <div className={`${style.burger_constructor_wrap} mb-10`} >
        <div className={ style.burger_constructor }>
          <BurgersIngredients ingredients={api}/>
          <BurgerConstructor ingredients={api}/>
        </div>
      </div>
    </div>
  );
}

export default App;
