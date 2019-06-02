import styled from 'styled-components';

const SubBoxLogo = styled.img`
  height: ${props => (props.height ? props.height : '30px')};
  width: ${props => (props.width ? props.width : 'auto')};
  padding-left: 15%;
  padding-right: 20%;

  position: relative;
  float: left;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 425px) {
  height: 17px;
  }
`;

export default SubBoxLogo;
