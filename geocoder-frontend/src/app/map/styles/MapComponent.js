import styled from 'styled-components';

const MapComponent = styled.div`
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  z-index: 0;
  flex: 3;
  position: absolute;
  width: 100%;
  height: calc(100vh - 72px); /* all vertical height minus header */
  top: 72px;

  @media (max-width: 645px) {
    height: calc(100vh - 115px); /* all vertical height minus header */
    top: 115px;
  }

  @media (max-width: 579px) {
    height: calc(100vh - 158px); /* all vertical height minus header */
    top: 158px;
  }
`;

export default MapComponent;
