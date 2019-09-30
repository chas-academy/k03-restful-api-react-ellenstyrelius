import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { subcategories } from '../utils/tintsCategories';
import color from '../utils/styling/color';
import size from '../utils/styling/size';
import fontSize from '../utils/styling/fontSize';

const { lavender, offBlack } = color;
const { small, medium } = size;

const Container = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  list-style-type: none;
`;

const MenuItem = styled.li`
  margin: ${small}px ${medium}px;
  padding: 2px;
  font-size: ${fontSize.fontSmall};
  text-transform: uppercase;
  > a {
    color: black;
    text-decoration: none;
    :hover {
      text-decoration: underline solid ${lavender};
    }
  }
`;

function SubMenu() {
  const category = window.location.href.split('products/')[1].split('/')[0];
  const basePath = `/products/${category}`;
  const specificSubcategories = subcategories.filter(item =>
    item.split('-')[1].includes(category)
  );

  return (
    <Container>
      {specificSubcategories.map((subcategory, index) => {
        const subcategoryPath = `${basePath}/${subcategory}`;
        const activeLinkStyle = {
          textDecoration: `underline solid ${offBlack}`
        };
        return (
          <MenuItem key={index}>
            <NavLink to={subcategoryPath} activeStyle={activeLinkStyle}>
              {subcategory.replace('-', ' ')}
            </NavLink>
          </MenuItem>
        );
      })}
    </Container>
  );
}

export default SubMenu;
