import styled from 'styled-components';

import fontSize from './fontSize';
import color from './color';

const { offBlack } = color;

export const Header = styled.h2`
  color: ${offBlack};
  font-size: ${fontSize.fontLarge};
  font-weight: 200;
  text-transform: uppercase;
  border-bottom: 1px solid ${offBlack};
`;

export const SearchResultsHeader = styled(Header)`
  text-transform: none;
`;
