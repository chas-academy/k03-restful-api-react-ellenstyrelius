import React, { useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Products from './components/Products';
import { categories, subCategories } from './utils/tintsCategories';
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
          return <Route key={index} path={categoryPath} component={Products} />;
        })}
        {subCategories.map((subCategory, index) => {
          const category = subCategory.split('-')[1];
          const categoryPath = `/products/${category}/${subCategory}`;
          return <Route key={index} path={categoryPath} component={Products} />;
        })}
      </Router>

      <Footer />
    </AppContainer>
  );
}

export default App;
