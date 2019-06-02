import styled from 'styled-components';

const Question = styled.div`
  flex: 1;
  padding: 0% 0% 10%;

  @media(max-width: 1024px) {
    height: 40%;
  }

  @media (max-width: 425px) {
    height: 60%;
    padding 0%;
  }
`;

export default Question;
