import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Loader from './Loader';
import Page from '../utils/styling/Page';
import apiUrl from '../utils/apiUrl';

const Container = styled.section``;

function Products() {
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
    <Page>
      {isLoading && <Loader />}
      <p>hej</p>
    </Page>
  );
}

export default Products;
