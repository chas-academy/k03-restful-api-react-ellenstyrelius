import React from 'react';
import styled, { keyframes } from 'styled-components';

import { ReactComponent as Splash } from '../utils/img/splash.svg';
import { ReactComponent as LogoName } from '../utils/img/logoName2.svg';
import Page from '../utils/styling/Page';
import { FlexRowCenter } from '../utils/styling/flexContainers';
import size from '../utils/styling/size';
import color from '../utils/styling/color';

const { medium, large } = size;
const { lavender, oldPeach, oldPeachLight } = color;

const Container = styled.div`
  margin-top: 20vh;
`;

const changeColor = keyframes`
  0% {
    fill: ${lavender};
  }
  30% {
    fill: ${oldPeach};
  }
  60% {
    fill: ${oldPeachLight};
  }
  100% {
    fill: ${lavender}
  }
`;

const SplashIcon = styled(Splash)`
  width: calc(${large}px * 20);
  max-width: 70vw;
  fill: ${color.lavender};
  animation: ${changeColor} 8s linear infinite;
`;

const LogoTitle = styled(LogoName)`
  width: calc(${large}px * 12);
  max-width: 45vw;
  margin-top: ${medium}px;
  position: absolute;
`;

function Home() {
  return (
    // LogoTitle should maybe route to Products component?
    <Page>
      <Container>
        <FlexRowCenter>
          <SplashIcon />
          <LogoTitle />
        </FlexRowCenter>
      </Container>
    </Page>
  );
}

export default Home;
