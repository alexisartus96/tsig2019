import styled from 'styled-components';

const InfoComponent = styled.div`
display: ${props => (props.showMenu ? 'flex' : 'none')};
-webkit-box-sizing: border-box;
-moz-box-sizing: border-box;
box-sizing: border-box;
position: absolute;
z-index: 1;
margin-left: 20px;
max-height: 80vh;
flex: 1;

height: calc(80vh - 55px); /* all vertical height minus header */
background: white;

flex-direction: column;
align-items: center;

width: 290px;

box-shadow: 1px 1px 10px 1px #888888;

@media (max-width: 1024px){
  width: 230px;
}

@media (max-width: 645px) {
  top: 130px;
}

@media (max-width: 579px) {
  height: calc(80vh - 85px);
  top: 178px;
}

@media (max-width: 425px) {
  display: none;
}

border-radius: 2%;
overflow-y: scroll;
`;

export default InfoComponent;