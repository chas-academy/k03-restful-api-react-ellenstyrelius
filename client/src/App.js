import React, { useState, useEffect } from 'react';

import NavBar from './components/NavBar';
import Loader from './components/Loader';
import apiUrl from './utils/apiUrl';

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
    <>
      <NavBar />
      {isLoading && <Loader />}
      <p>coming soon: Tingling Tints webshop</p>
      <div></div>
    </>
  );
}

export default App;
