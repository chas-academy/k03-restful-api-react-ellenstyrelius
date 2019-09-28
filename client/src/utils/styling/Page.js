import styled from 'styled-components';
import { heightOfNav } from '../../components/NavBar';

const Page = styled.section`
  width: 96%;
  margin-top: ${heightOfNav}px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Page;
