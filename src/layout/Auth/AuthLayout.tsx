import React from 'react';
import { Outlet } from 'react-router-dom';

import styled from '@emotion/styled';

import CompanyLogo from '../../components/CompanyLogo/CompanyLogo';

const AuthLayout = () => {
  return (
    <Container>
      <CompanyLogo />
      <Outlet />
    </Container>
  );
};

export default AuthLayout;

const Container = styled.div`
  height: 100dvh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  overflow: scroll;
  overflow-x: hidden;
  padding-top: 3.75rem;
  padding-bottom: 3.4rem;
`;
