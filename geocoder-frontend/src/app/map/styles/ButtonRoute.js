import styled from 'styled-components';

const ButtonRoute = styled.button`
  background-image: url(${props => props.img});
  background-position: center;
  background-size: 35px 35px;
  background-repeat: no-repeat;
  background-color: skyblue;

  flex: 1;

  border-radius: 25px;
  border-style: none;
  :focus {
    outline: 0;
  }
  background-color: ${props => (props.selected ? '#0797BA' : 'skyblue')};
  :hover {
    background-color: #0797BA;
  }
  cursor: pointer;
  width: 40px;
  height: 40px;
`;

export default ButtonRoute;
