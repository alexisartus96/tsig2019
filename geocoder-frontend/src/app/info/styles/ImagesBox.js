import styled from 'styled-components';

const ImagesBox = styled.div`
  margin: 1%;
  height: 450px;
  flex: 3;

  &:hover > * {
    transform: scale(0.97);
    transition: 0.5s all ease;
  }

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 425px) {
    flex: 1;
    width: 70%;
  }
`;

export default ImagesBox;
