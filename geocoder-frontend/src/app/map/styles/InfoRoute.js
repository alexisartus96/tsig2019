import styled from 'styled-components';

const InfoRoute = styled.div`
  height: 100%;

  font-family: Candara;
  font-weight: bold;
  line-height: normal;
  font-size: 18px;
  white-space: nowrap;

  flex: 3;
  justify-content: center;

  color: #000000;

  @media(max-width: 1024px) {
    font-size: 15px;
  }

  @media(max-width: 425px) {
    font-size: 10px;
  }  
`;

export default InfoRoute;
