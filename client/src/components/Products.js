import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import apiUrl from '../utils/apiUrl';
import Loader from './Loader';
import { ReactComponent as Splash } from '../utils/img/splash.svg';
import Page from '../utils/styling/Page';
import size from '../utils/styling/size';
import color from '../utils/styling/color';

const { gray4 } = color;

// styled components
const Container = styled.div``;

function Products() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [productsData, setProductsData] = useState(null);

  const fetchProducts = () => {
    console.log(apiUrl);
    fetch(`${apiUrl}/products`)
      .then(res => res.json())
      .then(data => {
        setIsLoading(false);
        setProductsData(data);
        console.log('🐐: fetchProducts -> data', data);
      })
      .catch(err => {
        setIsLoading(false);
        setHasError(true);
        return err;
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Page>
      {isLoading && <Loader />}
      {hasError && <p>Oh no, something bad happened</p>}
      {!isLoading && !hasError && productsData && (
        <Container>
          {productsData.map((product, index) => {
            const { hexCode, name, category } = product;
            return (
              // all this should be wrapped in a router link, routing to Product component that doesn't exist yet
              <div key={index}>
                <Splash
                  width={size.large * 4}
                  fill={hexCode}
                  stroke={category === 'white' ? gray4 : 'none'}
                />{' '}
                <p>{name}</p>
              </div>
            );
          })}
        </Container>
      )}
    </Page>
  );
}

export default Products;
