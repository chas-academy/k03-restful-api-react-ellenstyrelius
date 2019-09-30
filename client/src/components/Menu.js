import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { categories } from '../utils/tintsCategories';
import color from '../utils/styling/color';
import size from '../utils/styling/size';
import fontSize from '../utils/styling/fontSize';

const { lavender, offBlack } = color;
const { small, medium } = size;

const Container = styled.ul`
  background: white;
  opacity: 0.9;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  position: fixed;
  z-index: 9;
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

function Menu({ heightOfNav }) {
  const basePath = '/products';

  return (
    <>
      <Container style={{ top: `${heightOfNav}px` }}>
        {categories.map((item, index) => {
          const categoryPath = `${basePath}/${item}`;
          const activeLinkStyle = {
            textDecoration: `underline solid ${offBlack}`
          };
          return (
            <MenuItem key={index}>
              <NavLink
                to={categoryPath.replace(' ', '-')}
                activeStyle={activeLinkStyle}
              >
                {item}
              </NavLink>
            </MenuItem>
          );
        })}
      </Container>
    </>
  );
}

export default Menu;
