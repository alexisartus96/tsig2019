import styled from 'styled-components';

const Title = styled.a`
  width: -webkit-fill-available;
  height: auto;
  @media (max-width: 768px) {
    font-size: 36px;
  }
  @media (max-width: 376px) {
    font-size: 26px;
  }
  text-align: center;
  font-size: 40px;
  color: #067995;
  flex: 1;
`;

export default Title;
