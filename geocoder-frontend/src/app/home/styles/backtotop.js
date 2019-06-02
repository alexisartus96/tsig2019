import styled from 'styled-components';

export const BackLink = styled.a`
    position: fixed;
    bottom: ${props => (props.bottom ? props.bottom : '50px')};
    float: right;
    right: 2%;
    text-decoration: none;
    cursor: pointer;

    z-index: 2;
        
    $:hover {
      text-decoration:none;
    }
`;

export const BackIcon = styled.img`
   width: 40px;
   height: 40px;
   
   $:hover {
      text-decoration:none;
    }
`;
