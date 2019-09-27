import React from 'react';
import styled from 'styled-components';

import { ReactComponent as SearchIcon } from '../utils/img/search.svg';
import color from '../utils/styling/color';
import size from '../utils/styling/size';
import fontSize from '../utils/styling/fontSize';

const { offBlack, gray3 } = color;
const { min, small, large } = size;

const Container = styled.div`
  background: white;
  margin-right: ${large}px;
  border: 1px solid ${gray3};
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: calc(6 * ${large}px);
  margin: ${min}px ${small}px;
  color: ${offBlack};
  font-size: ${fontSize.fontSmall};
  border: none;
  :focus {
    outline: none;
  }
`;

function SearchField() {
  return (
    <Container>
      <Input placeholder="search for tints" />
      <SearchIcon />
    </Container>
  );
}

export default SearchField;
