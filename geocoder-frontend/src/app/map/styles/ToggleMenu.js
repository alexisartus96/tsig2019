import styled from 'styled-components';
import leftArrow from '../assets/left-arrow.svg';

const ToggleMenu = styled.div`
  padding: 2px;
  width: 23px;
  height: 48px;
  cursor: pointer;
  background: #FFFFFF url(${leftArrow}) center/11px 15px no-repeat;
  border-left: 1px solid #D4D4D4;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
  position: absolute;
  z-index: 1;
  top: 140px;
  left: ${props => (props.moveLeft ? '310px' : '1%')};
  transform: ${props => (props.moveLeft ? 'none' : 'translateX(-50%) rotate(-180deg)')};

  @media (max-width: 1024px) {
    left: ${props => (props.moveLeft ? '250px' : '1%')};
  }

  @media (max-width: 645px) {
    top: 150px;
  }

  @media (max-width: 579px) {
    top: 200px;
  }

  @media (max-width: 425px) {
    display: none;
  }
`;

export default ToggleMenu;
