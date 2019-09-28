import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import heightOfNav from '../utils/heightOfNav';
import { ReactComponent as LogoName } from '../utils/img/logoName.svg';
import SearchField from './SearchField';
import { ReactComponent as Cart } from '../utils/img/cart.svg';
import Menu from './Menu';
import color from '../utils/styling/color';
import size from '../utils/styling/size';
import fontSize from '../utils/styling/fontSize';

const { cream, oldPeachLight, gray3, offBlack } = color;
const { medium } = size;

const Nav = styled.nav`
  background: ${cream};
  width: 100%;
  height: ${heightOfNav}px;
  padding: 0 ${medium}px;
  box-shadow: 0 1px 2px ${gray3};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 10;
`;

const RightSideContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CartIcon = styled(Cart)`
  width: 22px;
  margin: 0 ${medium}px 2px 0;
  :hover {
    cursor: pointer;
    fill: ${oldPeachLight};
    transition: 0.3s;
  }
`;

const LogInContainer = styled.div`
  width: 68px;
  display: flex;
  justify-content: flex-end;
  > a {
    text-decoration: none;
  }
`;

const LogIn = styled.p`
  font-size: ${fontSize.fontMedium};
  text-transform: uppercase;
  color: ${offBlack};
  :hover {
    cursor: pointer;
    text-decoration: underline solid ${offBlack};
  }
`;

function NavBar({ isLoggedIn }) {
  return (
    <>
      <Nav>
        <Link to="/">
          <LogoName />
        </Link>
        <RightSideContainer>
          <SearchField />
          <CartIcon />
          <LogInContainer>
            {!isLoggedIn ? (
              <Link to="/login">
                <LogIn>log in</LogIn>
              </Link>
            ) : (
              <Link to="/">
                <LogIn>log out</LogIn>
              </Link>
            )}
          </LogInContainer>
        </RightSideContainer>
      </Nav>
      <Menu {...{ heightOfNav }} />
    </>
  );
}

export default NavBar;
