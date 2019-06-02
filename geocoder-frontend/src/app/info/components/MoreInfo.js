import React from 'react';
import Box from '../styles/Box';
import TitleBox from '../styles/TitleBox';
import Title from '../styles/Title';
import Triangle from '../styles/Triangle';
import SubBox from '../styles/SubBox';
import ImagesBox from '../styles/ImagesBox';
import trashIsland1 from '../assets/trash-island1.jpeg';
import trashIsland2 from '../assets/trash-island2.png';
import trashIsland3 from '../assets/trash-island3.png';
import finland1 from '../assets/finland1.jpeg';
import finland2 from '../assets/finland2.png';
import finland3 from '../assets/finland3.png';
import TextBox from '../styles/TextBox';
import Line from '../styles/Line';
import TextTitle from '../styles/TextTitle';
import Text from '../styles/Text';
import Image from '../styles/Image';

const MoreInfo = () => (
  <Box>
    <TitleBox>
      <Title>Mundo actual</Title>
      <Triangle />
    </TitleBox>
    <SubBox>
      <ImagesBox>
        <Image src={trashIsland1} flex={2} flexBasis="100%" />
        <Image src={trashIsland2} flex={1} />
        <Image src={trashIsland3} flex={1} showOnMobile />
      </ImagesBox>
      <TextBox>
        <TextTitle>Islas de basura</TextTitle>
        <Line />
        <Text>
        Las islas de la basura son aglomeraciones de residuos no biodegradables que
         por el influjo de los giros oceánicos (el sistema de corrientes marinas
          rotativas) se van acumulando en extensas balsas flotantes. La más grande
           hallada hasta el momento es la isla de basura en el Pacífico, pero hay otras cuatro
            repartidas en los demás océanos a excepción del Ártico y el Antártico.
        </Text>
      </TextBox>
    </SubBox>

    <SubBox reverse>
      <ImagesBox>
        <Image src={finland1} flex={2} flexBasis="100%" />
        <Image src={finland2} flex={1} showOnMobile />
        <Image src={finland3} flex={1} />
      </ImagesBox>
      <TextBox>
        <TextTitle>Finlandia es el país más verde</TextTitle>
        <Line />
        <Text>
        Finlandia: es el país más verde del mundo. Se han marcado como objetivo para 2020
         que un 38% de la energía que se consuma en este país provenga de energías renovables.
        </Text>
      </TextBox>
    </SubBox>
  </Box>
);

export default MoreInfo;
