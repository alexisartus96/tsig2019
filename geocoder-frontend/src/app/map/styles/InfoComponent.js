import styled from 'styled-components';

const InfoComponent = styled.div`
  display: ${props => (props.showMenu ? 'flex' : 'none')};
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  position: absolute;
  z-index: 1;
  margin-left: 20px;
  
  flex: 1;
  
  height: calc(80vh - 55px); /* all vertical height minus header */
  background: white;
  
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  
  width: 290px;

  box-shadow: 1px 1px 10px 1px #888888;

  @media (max-width: 1024px){
    width: 230px;
  }

  @media (max-width: 425px) {
    flex-direction: column;
    height: auto;
    flex: 2;
    width: 80vw;
    justify-content: center;
    align-items: center;
    margin-left: 0;
    top: 58%;
  }
  
  border-radius: 2%;
`;

export default InfoComponent;
