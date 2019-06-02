import styled from 'styled-components';

const Image = styled.div`
  margin: 1%;
  background-position: center;
  background-size: cover;
  background-image: url(${props => props.src});


  display: block;

  @media (max-width: 425px) {
    margin: 0%;
    flex: 1;
    height: 300px;
    display: ${props => (props.showOnMobile ? null : 'none')};
    flex-basis: auto;
  }

  height: 225px;

  flex: ${props => props.flex};
  flex-basis: ${props => props.flexBasis};
`;

export default Image;
