import styled from 'styled-components';
import heightOfNav from '../heightOfNav';

const height = heightOfNav + 100;

const Page = styled.section`
  width: 96%;
  margin-top: ${height}px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Page;
