import styled from 'styled-components';

export const SearchNav = styled.div`
  background: #0797BA;
  color: #FFFFFF;
  font-family: "Candara";
  font-weight: bold;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
`;

export const SearchNavSubBox = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export const InputGroup = styled.div`
  width: 100%;
`;

export const LabelRadioButton = styled.label`
  align-items: center;
  display: inline-flex;
  margin-right: 8px;
`;

export const InputRadioButton = styled.input`
  margin: 8px 5px;
`;

export const InputName = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  display: inline-block;
  margin: 8px 5px;
  max-width: 280px;
  padding: 5px;
  width: 100%;
`;

export const InputNumber = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  display: inline-block;
  margin: 8px 5px;
  max-width: 280px;
  padding: 5px;
  width: 100%;
`;

export const SearchButton = styled.button`
  background-color: #4CAF50;
  padding: 6px;
  color: white;
  margin: 8px 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  @media (max-width: 645px) {
    max-width: 280px;
    width: 100%;
  }
`;
