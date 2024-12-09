import React from 'react';

import styled from '@emotion/styled';

import { LOCUMJOBS } from '../../routes/routeConstants';
import { InternalNavLink } from '../Link/Link';

const EmptyApplicationCard = () => {
  return (
    <Container>
      You currently don’t have any application{' '}
      <InternalNavLink to={`/${LOCUMJOBS}`}>
        <Span>click here</Span>{' '}
      </InternalNavLink>
      to get started
    </Container>
  );
};

export default EmptyApplicationCard;

const Container = styled.div`
  color: ${({ theme }) => theme.palette.blackBlackMain};
  grid-column: 1/4;
  align-self: center;
  text-align: center;
  margin: auto;
  width: 20rem;
  font-weight: 400;
`;

const Span = styled.span`
  color: ${({ theme }) => theme.palette.mainBlue};
`;
