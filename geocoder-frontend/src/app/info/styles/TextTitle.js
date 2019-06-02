import styled from 'styled-components';

const TextTitle = styled.div`
  font-size: 30px;
  @media (max-width: 768px) {
    font-size: 26px;
  }
  @media (max-width: 376px) {
    font-size: 20px;
  }

  flex: 2;
`;

export default TextTitle;
