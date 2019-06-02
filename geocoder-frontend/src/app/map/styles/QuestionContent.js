import styled from 'styled-components';

const QuestionContent = styled.a`
  font-family: Candara;
  font-weight: bold;
  line-height: normal;
  font-size: 16px;

  text-align: center;

  color: #0797BA;

  position: relative;
  float: left;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 1024px) {
    font-size: 17px;
  }

  @media (max-width: 425px) {
    font-size: 11px;
  }
`;

export default QuestionContent;
