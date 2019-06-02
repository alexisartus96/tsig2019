import styled from 'styled-components';

const Box = styled.div`
  font-family: "Candara";
  font-weight: bold;

  display: flex;
  flex-direction: column;

  height: calc(180vh - 55px);

  @media (max-width: 425px) {
    height: 100%;
  }
`;

export default Box;
