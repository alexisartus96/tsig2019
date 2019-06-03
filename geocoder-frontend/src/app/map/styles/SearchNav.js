import styled from 'styled-components';

export const SearchNav = styled.div`
  position: absolute;
  top: 0;
  z-index: 1;
  width: 100%;
  background: #0797BA;
  color: #FFFFFF;
  font-family: "Candara";
  font-weight: bold;
  
`;

export const SearchNavSubBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 50%;
`;


export const InputName = styled.input`
  margin: 8px 5px;
  display: inline-block;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  flex: 2;
`;

export const InputNumber = styled.input`
  padding: 5px;
  margin: 8px 5px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  flex: 2;
`;

export const SearchButton = styled.button`
  background-color: #4CAF50;
  padding: 5px;
  color: white;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;