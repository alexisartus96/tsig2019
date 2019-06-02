import styled from 'styled-components';

const TextBox = styled.div`
  line-height: normal;
  color: #000;

  margin: 5% 2% 10%;

  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;

  @media (max-width: 425px) {
    margin: 0% 7% ;
    flex: 2;
    margin-bottom: 8%;
  }
`;

export default TextBox;
