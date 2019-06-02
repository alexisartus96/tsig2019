import styled from 'styled-components';

const Text = styled.div`
  font-size: 20px;
  @media (max-width: 768px) {
    font-size: 16px;
  }
  @media (max-width: 376px) {
    font-size: 14px;
  }

  flex: 7;
`;

export default Text;
