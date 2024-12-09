import React from 'react';

import styled from '@emotion/styled';

import { SecondaryButton } from '../Button';
import Img from '../Img/Img';
import TextCard from '../TextCard/TextCard';

interface IHero {
  title: string;
  description: string;
  imgSrc: string;
}

const Hero: React.FC<IHero> = ({ title, description, imgSrc }) => {
  return (
    <Container>
      <Img src={imgSrc} />
      <ContentArea>
        <TextCard title={title} className="whiteText">
          {description}
        </TextCard>
        <SecondaryButton className="whiteBtn">Get Started</SecondaryButton>
      </ContentArea>
    </Container>
  );
};

export default Hero;

// Styled

const Container = styled.div`
  display: grid;

  & > * {
    grid-column: 1;
    grid-row: 1;
  }
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  width: 30rem;
  gap: 2rem;
  margin-left: 11.56rem;
`;
