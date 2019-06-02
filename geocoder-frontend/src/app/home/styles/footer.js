import styled from 'styled-components';

export const Box = styled.footer`
  position: relative;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #0797BA;
  color: #FFFFFF;
  font-family: "Candara";
  padding: 15px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  flex: 10;
  
  @media (max-width: 425px) {
    flex-direction: column;
  }
`;

export const SubBox = styled.div`
  flex: ${props => (props.shrink ? 0.4 : 1)};

  @media (min-width : 426px) and (max-width : 768px) {
    display: ${props => (props.dontShowOnTablet ? 'none' : null)};
  }

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 425px) {
    width: 100%;
    margin-bottom: 15px;
  }
`;

export const SubBoxTitle = styled.div`
  flex: 1;
`;

export const SubBoxText = styled.div`
  flex: 1;
  white-space: nowrap;
`;

export const Line = styled.div`
  flex: 1;
  width: 80%;
  margin: 1% 0% 2% 0%;
  border: 0.5px solid #FFFFFF;
`;

export const FooterText = styled.a`
    color: #FFFFFF;
    text-decoration: none;
`;

export const Logo = styled.img`
  filter: brightness(0) invert(1);
  margin-right: 10px;
  vertical-align: middle;
`;

export const Link = styled.a`
  :link {
      color: white; 
      background-color: transparent; 
      text-decoration: none;
  }

  :visited {
      color: white;
      background-color: transparent;
      text-decoration: none;
  }

  :hover {
      color: white;
      background-color: transparent;
      text-decoration: underline;
  }

  :active {
      color: white;
      background-color: transparent;
      text-decoration: underline;
  }
`;

export const LeafLogo = styled.img`
    height: 20px;
    width: 20px;
    margin-right: 2%;
`;
