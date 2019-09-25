import React from 'react';
import styled from 'styled-components';

import size from './utils/styling/size';
import color from './utils/styling/color';
import fontSize from './utils/styling/fontSize';
import { ReactComponent as Splash } from './utils/splash.svg';

const Container = styled.div`
  padding: calc(7 * ${size.small} + ${size.medium});
`;

function App() {
  return (
    <>
      <Container>
        <p style={{ fontSize: fontSize.large }}>
          Coming soon: Tingling Tints webshop (°-°)
        </p>
      </Container>
      <Splash height={160} fill={color.oldPeach} />
    </>
  );
}

export default App;
