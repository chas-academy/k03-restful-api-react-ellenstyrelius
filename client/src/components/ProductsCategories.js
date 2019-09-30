import React, { useState, useEffect } from 'react';

import apiUrl from '../utils/apiUrl';
import Loader from './Loader';
import Error from './Error';
import CategoryHeader from './CategoryHeader';
import SubMenu from './SubMenu';
import { ReactComponent as Splash } from '../utils/img/splash.svg';
import Page from '../utils/styling/Page';
import ProductContainer from '../utils/styling/ProductContainer';
import size from '../utils/styling/size';
import color from '../utils/styling/color';
import { FlexRowCenter } from '../utils/styling/flexContainers';

const { offBlack } = color;
const { large } = size;

function ProductsCategories() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [productsData, setProductsData] = useState(null);

  const fetchProducts = () => {
    const category = window.location.href.split('products/')[1].split('/')[0];
    const fetchUrl = `${apiUrl}/products/categories/${category}`;

    fetch(fetchUrl)
      .then(res => res.json())
      .then(data => {
        setIsLoading(false);
        setProductsData(data);
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
          <CategoryHeader />
          <SubMenu />
          <FlexRowCenter>
            {productsData.map((product, index) => {
              const { hexCode, name, category } = product;
              return (
                // all this should be wrapped in a router link, routing to Product component that doesn't exist yet
                <ProductContainer key={index}>
                  <Splash
                    width={large * 4}
                    fill={hexCode}
                    stroke={category === 'white' ? offBlack : 'none'}
                  />
                  <p>{name}</p>
                </ProductContainer>
              );
            })}
          </FlexRowCenter>
        </>
      )}
    </Page>
  );
}

export default ProductsCategories;
