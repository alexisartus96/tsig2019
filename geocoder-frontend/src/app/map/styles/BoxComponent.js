import styled from 'styled-components';

const BoxComponent = styled.div`

  margin: 12% 12%;

  padding: 10% 1%;

  flex: 6;

  justify-content: space-between;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1024px) {
    padding: 0% 1%;
  }

  @media (max-width: 425px) {
    height: auto;
    padding: 10px;
    margin: 20px;
    justify-content: space-between;
  }
`;

export default BoxComponent;
