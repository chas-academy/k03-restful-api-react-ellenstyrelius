import React, { useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Products from './components/Products';
import ProductsCategories from './components/ProductsCategories';
import ProductsSubCategories from './components/ProductsSubcategories';
import { categories, subcategories } from './utils/tintsCategories';
import color from './utils/styling/color';

const AppContainer = styled.div`
  background: ${color.offWhite};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-family: 'Roboto', 'Helvetica Neue', Helvetica, sans-serif;
  font-weight: 200;
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AppContainer>
      <Router>
        <NavBar {...{ isLoggedIn }} />

        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/products/all-tints" component={Products} />
        {categories.map((category, index) => {
          const categoryPath = `/products/${category}`;
          return (
            <Route
              key={index}
              exact
              path={categoryPath}
              component={ProductsCategories}
            />
          );
        })}
        {subcategories.map((subcategory, index) => {
          const category = subcategory.split('-')[1];
          const subcategoryPath = `/products/${category}/${subcategory}`;
          return (
            <Route
              key={index}
              exact
              path={subcategoryPath}
              component={ProductsSubCategories}
            />
          );
        })}
      </Router>

      <Footer />
    </AppContainer>
  );
}

export default App;
