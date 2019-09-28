import React, { useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import color from './utils/styling/color';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import Products from './components/Products';

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
        <Route path="/products" component={Products} />
      </Router>
    </AppContainer>
  );
}

export default App;
