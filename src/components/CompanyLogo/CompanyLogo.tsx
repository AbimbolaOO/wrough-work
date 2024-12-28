import React from 'react';

import styled from '@emotion/styled';

import { DASHBOARD } from '../../routes/routeConstants';
import { ButtonLink } from '../Link/Link';

interface CompanyLogoProps {
  goHome?: boolean;
}

const CompanyLogo: React.FC<CompanyLogoProps> = ({ goHome }) => {
  if (goHome) {
    return (
      <ButtonLink to={`/${DASHBOARD}`}>
        <Container>
          <img src='/static/svg/companyLogo.svg' alt='Company' />
        </Container>
      </ButtonLink>
    );
  }
  return (
    <ButtonLink to='https://locumspace.co/' target='_blank'>
      <Container>
        <img src='/static/svg/companyLogo.svg' alt='Company' />
      </Container>
    </ButtonLink>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.12rem;
  font-weight: 500;
  color: black;
  width: fit-content;

  @media (max-width: 884px) {
    width: 87px;
    height: 43px;
  }

  @media (max-width: 480px) {
    width: 52px;
    height: 26px;
  }
`;

export default CompanyLogo;
