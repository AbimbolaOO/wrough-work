import React from 'react';

import styled from '@emotion/styled';

import { LOCUMJOBS } from '../../routes/routeConstants';
import { InternalNavLink } from '../Link/Link';

const EmptyApplicationCard = () => {
  return (
    <Container>
      You currently don’t have any application <br />
      <InternalNavLink to={`/${LOCUMJOBS}`}>
        <Span>click here </Span>
      </InternalNavLink>
      <span>to get started</span>
    </Container>
  );
};

export default EmptyApplicationCard;

const Container = styled.div`
  color: ${({ theme }) => theme.palette.blackBlackMain};
  align-self: center;
  text-align: center;
  font-weight: 400;
  width: 100%;
  height: 100%;
  place-content: center;
`;

const Span = styled.span`
  color: ${({ theme }) => theme.palette.mainBlue};
`;
