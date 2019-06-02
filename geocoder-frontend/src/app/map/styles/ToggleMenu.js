import styled from 'styled-components';
import leftArrow from '../assets/left-arrow.svg';

const ToggleMenu = styled.div`
  background: #fff;
  padding: 2px;
  width: 23px;
  height: 48px;
  cursor: pointer;
  background: rgba(255,255,255,0.9) url(${leftArrow}) center/11px 15px no-repeat;
  border-left: 1px solid #D4D4D4;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
  position: absolute;
  z-index: 1;
  top: 15%;
  left: ${props => (props.moveLeft ? '310px' : '1%')};
  transform: ${props => (props.moveLeft ? 'none' : 'translateX(-50%) rotate(-180deg)')};

  @media (max-width: 1024px) {
    left: ${props => (props.moveLeft ? '250px' : '1%')};
  }
  
  @media (max-width: 425px) {
    top: ${props => (props.moveLeft ? '55%' : '97%')};
    left: 50%;
    transform: ${props => (props.moveLeft ? 'translateX(-50%) translateY(-50%) rotate(-90deg)' : 'translateX(-50%) translateY(-50%) rotate(-270deg)')};
  }
`;

export default ToggleMenu;
