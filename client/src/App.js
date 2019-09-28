import React, { useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import Products from './components/Products';
import Category from './components/Category';
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
        <Route path="/products/red" component={Category} />
        <Route path="/products/blue" component={Category} />
        <Route path="/products/yellow" component={Category} />
        <Route path="/products/green" component={Category} />
        <Route path="/products/purple" component={Category} />
        <Route path="/products/orange" component={Category} />
        <Route path="/products/pink" component={Category} />
        <Route path="/products/brown" component={Category} />
        <Route path="/products/gray" component={Category} />
        <Route path="/products/white" component={Category} />
      </Router>
    </AppContainer>
  );
}

export default App;
