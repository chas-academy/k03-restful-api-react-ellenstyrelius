import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import color from './utils/styling/color';
import NavBar from './components/NavBar';
import Loader from './components/Loader';
import apiUrl from './utils/apiUrl';

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
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = () => {
    console.log(apiUrl);
    fetch(`${apiUrl}/products`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <AppContainer>
      <NavBar />
      {isLoading && <Loader />}
    </AppContainer>
  );
}

export default App;
