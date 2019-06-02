import styled from 'styled-components';

const MapComponent = styled.div`
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  z-index: 0;
  flex: 3;
  position: absolute;
  width: 100%;
  height: calc(100vh - 55px); /* all vertical height minus header */
`;

export default MapComponent;
