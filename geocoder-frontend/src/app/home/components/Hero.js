import React from 'react';
import {
  scroller as scroll,
} from 'react-scroll';
import heroImage from '../assets/heroImage.jpg';
import arrowDown from '../assets/arrow-up.png';
import {
  HeroImage, HeroTitle, TextBox, PrimaryBox, GoToMap, Br, HeroSubTitle, SubTextBox, GoToMapLink,
} from '../styles/hero';

const Hero = () => (
  <PrimaryBox>
    <HeroImage src={heroImage} />
    <TextBox>
      <HeroTitle>
          Con tu ayuda podemos hacer del planeta un lugar mejor.
        <Br />
          Permite que te guiemos en tu camino al reciclaje.
      </HeroTitle>
    </TextBox>
    <HeroSubTitle>
      <SubTextBox>
          Continua tu camino
      </SubTextBox>
    </HeroSubTitle>
    <GoToMapLink onClick={() => scroll.scrollTo('Map', {
      delay: 0, smooth: 'easeInOutQuart', duration: 1000, offset: (-110),
    })}
    >
      <GoToMap src={arrowDown} />
    </GoToMapLink>
  </PrimaryBox>
);

export default Hero;
