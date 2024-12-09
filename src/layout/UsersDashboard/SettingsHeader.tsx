import React from 'react';

import styled from '@emotion/styled';

const SettingsHeader = () => {
  return (
    <Container>
      <Header1>Settings</Header1>
      <P>Welcome to dashoard</P>
    </Container>
  );
};

export default SettingsHeader;

const Container = styled.div`
  background-color: white;
  color: ${({ theme }) => theme.palette.blackBlackMain};
  padding: 1.12rem 3.38rem;
`;

const Header1 = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
`;

const P = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.palette.greyGrey1};
`;
