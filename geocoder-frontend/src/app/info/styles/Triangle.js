import styled from 'styled-components';

const Triangle = styled.div`    
  @media (max-width: 768px) {
    border-left: 150px solid transparent; 
    border-right: 150px solid transparent; 
    border-top: 7px solid rgba(196, 196, 196, 0.7);
  }
  @media (max-width: 376px) {
    border-left: 100px solid transparent; 
    border-right: 100px solid transparent; 
    border-top: 6px solid rgba(196, 196, 196, 0.7);
    flex: 2;
  }

  width: 0;
  height: 0;
  margin-top: 1%;
  margin-bottom: 1%;
  border-left: 180px solid transparent;
  border-right: 180px solid transparent;
  border-top: 8px solid rgba(196, 196, 196, 0.7);
  flex: 1;
`;

export default Triangle;
