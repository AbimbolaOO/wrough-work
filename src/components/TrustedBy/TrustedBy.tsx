import React from 'react';

import styled from '@emotion/styled';

import Img from '../Img/Img';

const TrustedBy = () => {
  return (
    <Container>
      <Title>
        Trusted by the biggest names in Healthcare throughout Nigeria
      </Title>
      <LogoArea>
        {/* <Img src="/static/svg/techPointLogo.svg" alt="Techpoint" /> */}
        <Img src="/static/svg/chipperLogo.svg" alt="chipper" />
        <Img src="/static/svg/uberLogo.svg" alt="Uber" />
        <Img src="/static/svg/chipperLogo.svg" alt="chipper" />
        <Img src="/static/svg/microsoftLogo.svg" alt="microsoft" />
        <Img src="/static/svg/mtn.svg" alt="mtn" />
        <Img src="/static/svg/microsoftLogo.svg" alt="microsoft" />
        {/* <Img src="/static/svg/harmoniclogo.svg" alt="harmonic" /> */}
      </LogoArea>
    </Container>
  );
};

export default TrustedBy;

// Sytles
const Container = styled.section`
  display: flex;
  flex-direction: column;
  /* border: 2px solid red; */
  align-items: center;
  gap: 1.5rem;
  margin-top: 3.37rem;
  margin-bottom: 3.37rem;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.blackBlackMain};
`;

const LogoArea = styled.div`
  display: flex;
  gap: 3.12rem;
  padding: 0.62rem 0;
`;
