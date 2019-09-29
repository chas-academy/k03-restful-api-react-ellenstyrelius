import styled from 'styled-components';

import { FlexColumnCenter } from './flexContainers';
import size from './size';
import fontSize from './fontSize';

const { medium, large } = size;
const marginTop = large * 3;
const marginSides = large + medium;

const ProductContainer = styled(FlexColumnCenter)`
  margin: ${marginTop}px ${marginSides}px 0 ${marginSides}px;
  > p {
    margin-top: ${medium}px;
    font-size: ${fontSize.fontSmall};
    text-transform: capitalize;
  }
`;

export default ProductContainer;
