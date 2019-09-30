import React from 'react';
import styled from 'styled-components';

import color from '../utils/styling/color';
import fontSize from '../utils/styling/fontSize';
import size from '../utils/styling/size';

const { oldPeach, offBlack } = color;
const { large } = size;

const FooterContainer = styled.footer`
  background: ${oldPeach};
  width: 100%;
  height: 200px;
  margin-top: calc(${large}px * 6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${fontSize.fontMedium};
  color: ${offBlack};
`;

const Link = styled.a`
  color: ${offBlack};
  text-decoration: none;
  :hover {
    text-decoration: underline solid ${offBlack};
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <p>
        -{' '}
        <Link
          href="https://github.com/ellenstyrelius"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ellen Styrélius
        </Link>{' '}
        2019 -
      </p>
    </FooterContainer>
  );
}

export default Footer;
