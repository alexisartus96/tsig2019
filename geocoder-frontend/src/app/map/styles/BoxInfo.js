import styled from 'styled-components';

const BoxInfo = styled.div`
  flex: 2;
  width: 100%;
  margin: 5px
  display: flex;
  flex-direction: row;
  
  @media (max-width: 425px) {
    width: 65%;
  }
`;

export default BoxInfo;
