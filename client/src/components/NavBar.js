import React from 'react';
import styled from 'styled-components';

import { ReactComponent as LogoName } from '../utils/img/logoName.svg';
import SearchField from './SearchField';
import { ReactComponent as Cart } from '../utils/img/cart.svg';
import color from '../utils/styling/color';
import size from '../utils/styling/size';
import fontSize from '../utils/styling/fontSize';

const { cream, oldPeachLight, gray3, offBlack } = color;
const { small, medium, large } = size;

const Nav = styled.nav`
  background: ${cream};
  width: 100%;
  padding: ${small} ${medium};
  box-shadow: 0 1px 2px ${gray3};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
`;

const HomeLink = styled.a`
  :hover {
    cursor: pointer;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const CartIcon = styled(Cart)`
  height: calc(3 * ${small});
  margin: 0 ${medium} ${small} 0;
  :hover {
    cursor: pointer;
    fill: ${oldPeachLight};
    transition: 0.3s;
  }
`;

const LogIn = styled.a`
  font-size: ${fontSize.fontMedium};
  text-transform: uppercase;
  color: ${offBlack};
  :hover {
    cursor: pointer;
    text-decoration: underline solid ${offBlack};
  }
`;

function NavBar() {
  return (
    <Nav>
      <HomeLink>
        <LogoName />
      </HomeLink>
      <Container>
        <SearchField />
        <CartIcon />
        <LogIn>log in</LogIn>
      </Container>
    </Nav>
  );
}

export default NavBar;
