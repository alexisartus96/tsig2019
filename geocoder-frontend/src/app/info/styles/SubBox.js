import styled from 'styled-components';

const SubBox = styled.div`
  width: -webkit-fill-available;
  height: auto;
  flex: 7;

  display: flex;
  align-items: center;
  flex-direction: ${props => (props.reverse ? 'row-reverse' : 'row')};

  @media (max-width: 425px) {
    flex-direction: column;
    flex: 5;
    background:  ${props => (props.reverse ? '#f3f3f3' : '')}; 
  }
`;

export default SubBox;
