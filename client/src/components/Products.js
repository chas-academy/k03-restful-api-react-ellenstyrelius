import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import apiUrl from '../utils/apiUrl';
import Loader from './Loader';
import Error from './Error';
import MenuSubCategories from './MenuSubCategories';
import { ReactComponent as Splash } from '../utils/img/splash.svg';
import Page from '../utils/styling/Page';
import ProductContainer from '../utils/styling/ProductContainer';
import size from '../utils/styling/size';
import color from '../utils/styling/color';
import { FlexRowCenter } from '../utils/styling/flexContainers';
import { Header } from '../utils/styling/headers';

const { offBlack } = color;
const { large } = size;

const Container = styled(FlexRowCenter)``;

function Products() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [productsData, setProductsData] = useState(null);

  const urlArr = window.location.href.split('/');
  const fetchParamCategory = urlArr[urlArr.length - 1];

  const fetchProducts = () => {
    let fetchUrl;
    fetchParamCategory === 'all-tints'
      ? (fetchUrl = `${apiUrl}/products`)
      : (fetchUrl = `${apiUrl}/products/categories/${fetchParamCategory}`);

    fetch(fetchUrl)
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
      {hasError && <Error />}
      {!isLoading && !hasError && productsData && (
        <>
          <Header>
            {fetchParamCategory === 'all-tints'
              ? fetchParamCategory.replace('-', ' tingling ')
              : `${fetchParamCategory} tints`}
          </Header>
          <MenuSubCategories {...{ fetchParamCategory }} />
          <Container>
            {productsData.map((product, index) => {
              const { hexCode, name, category } = product;
              return (
                // all this should be wrapped in a router link, routing to Product component that doesn't exist yet
                <ProductContainer key={index}>
                  <Splash
                    width={large * 4}
                    fill={hexCode}
                    stroke={category === 'white' ? offBlack : 'none'}
                  />{' '}
                  <p>{name}</p>
                </ProductContainer>
              );
            })}
          </Container>
        </>
      )}
    </Page>
  );
}

export default Products;
