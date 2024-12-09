import React from 'react';

import styled from '@emotion/styled';

import Img from '../../../../components/Img/Img';

const Banner = () => {
  return (
    <Container>
      <TextArea>
        <Header1>Hello</Header1>
        <p>
          To ensure the best experience for all users, we require the completion
          of your profile before accessing our platform's features and benefits.{' '}
        </p>
        <FooterContent>
          Complete profile <Img src='/static/svg/bulletIcon.svg' alt='icon' />
        </FooterContent>
      </TextArea>
      <ImageArea>
        <Img
          src='/static/svg/doctorAndPatient.svg'
          alt='doctor examining patient'
        />
      </ImageArea>
    </Container>
  );
};

export default Banner;

const Container = styled.section`
  border-radius: 0.625rem;
  display: flex;
  justify-content: space-between;
  color: white;
  background: rgba(122, 64, 242, 0.95);
  padding: 2.12rem 3.13rem;
  position: relative;

  //mobile-specific styles
  @media (max-width: 768px) {
    padding: 2.12rem 1rem;
  }
`;

const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 30rem;
  font-size: 1.125rem;
  gap: 0.5rem;
  // border: 2px solid red;

  //mobile-specific styles
  @media (max-width: 768px) {
    & > p {
      font-size: 14px;
      font-weight: 300;
      line-height: 20.93px;
    }
  }
`;

const Header1 = styled.p`
  font-weight: 300;
  font-size: 1.5rem;

  //mobile-specific styles
  @media (max-width: 768px) {
    font-size: 16px;
    font-weight: 500;
    line-height: 23.92px;
  }
`;

const FooterContent = styled.div`
  display: flex;
  gap: 0.5rem;
  color: ${({ theme }) => theme.palette.stateColorYellow};
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 18px;
    font-weight: 500;
  }
`;

const ImageArea = styled.div`
  position: absolute;
  right: 3.13rem;
  bottom: 0;

  //mobile-specific styles
  @media (max-width: 768px) {
    display: none;
  }
`;
