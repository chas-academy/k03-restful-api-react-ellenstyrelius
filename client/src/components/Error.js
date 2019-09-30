import React from 'react';
import styled, { keyframes } from 'styled-components';

import Page from '../utils/styling/Page';
import fontSize from '../utils/styling/fontSize';

const Text = styled.p`
  font-size: ${fontSize.fontLarge};
`;

function Error() {
  return (
    <Page>
      <Text>
        Oh no, something went horribly wrong{' '}
        <span role="img" aria-label="crying emoji">
          😭
        </span>
      </Text>
    </Page>
  );
}

export default Error;
