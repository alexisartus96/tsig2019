import styled from 'styled-components';

const QuestionTextBox = styled.div`
  flex-direction: column;
  align-items: center;
  padding: 0 20px;

  flex: 3;

  @media (max-width: 425px) {
    height: 35%;
  }
`;

export default QuestionTextBox;
