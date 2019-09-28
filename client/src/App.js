import React, { useState } from 'react';
import styled from 'styled-components';

import color from './utils/styling/color';
import NavBar from './components/NavBar';
import Home from './components/Home';
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
  return (
    <AppContainer>
      <NavBar />
      <Home />
      <Products />
    </AppContainer>
  );
}

export default App;
