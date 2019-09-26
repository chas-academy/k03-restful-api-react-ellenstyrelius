import React from 'react';
import styled, { keyframes } from 'styled-components';

import { ReactComponent as Splash } from '../utils/img/splash.svg';
import color from '../utils/styling/color';
import size from '../utils/styling/size';

const { lavender, oldPeach, oldPeachLight } = color;

const rotateAndChangeColor = keyframes`
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
    transform: rotate(360deg);
    fill: ${lavender}
  }
`;

const AnimatedLoader = styled(Splash)`
  height: calc(2 * ${size.large});
  margin-top: 240px;
  animation: ${rotateAndChangeColor} 4s linear infinite;
`;

function Loader() {
  return <AnimatedLoader />;
}

export default Loader;
