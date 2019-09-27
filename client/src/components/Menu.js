import React from 'react';
import styled from 'styled-components';

import color from '../utils/styling/color';
import size from '../utils/styling/size';
import fontSize from '../utils/styling/fontSize';

const { lavender } = color;
const { small, medium } = size;

const menuItems = [
  'all tints',
  'red',
  'blue',
  'yellow',
  'green',
  'purple',
  'orange',
  'pink',
  'brown',
  'gray',
  'white'
];

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
  color: black;
  margin: ${small}px ${medium}px;
  padding: 2px;
  font-size: ${fontSize.fontSmall};
  text-transform: uppercase;
  :hover {
    cursor: pointer;
    background: ${lavender};
    transition: 0.3s;
  }
`;

function Menu({ heightOfNav }) {
  return (
    <Container style={{ top: `${heightOfNav}px` }}>
      {menuItems.map((item, index) => {
        return <MenuItem key={index}>{item}</MenuItem>;
        // onClick: route to category view
      })}
    </Container>
  );
}

export default Menu;
