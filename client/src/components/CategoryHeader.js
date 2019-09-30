import React from 'react';
import { Link } from 'react-router-dom';

import { Header } from '../utils/styling/headers';

function CategoryHeader() {
  const category = window.location.href.split('products/')[1].split('/')[0];

  return (
    <Link to={`/products/${category}`} style={{ textDecoration: 'none' }}>
      <Header>
        {category === 'all-tints'
          ? category.replace('-', ' tingling ')
          : `${category.replace('-', ' ')} tints`}
      </Header>
    </Link>
  );
}

export default CategoryHeader;
