import React from 'react';

import styled from '@emotion/styled';

import { PrimaryButton } from '../Button';
import { ButtonLink } from '../Link/Link';

interface IActionButtonCard {
  title: string;
  description: string;
  link: string;
}

const ActionButtonCard: React.FC<IActionButtonCard> = ({
  title,
  description,
  link,
}) => {
  return (
    <Container>
      <Title>{title}</Title>
      <MainContent>{description}</MainContent>
      <ButtonLink to={link}>
        <PrimaryButton className="weight500">More information</PrimaryButton>
      </ButtonLink>
    </Container>
  );
};

export default ActionButtonCard;

// styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  border-radius: 0.25rem;
  border: 1px solid var(--grey-grey-4, #f8f8f8);
  box-shadow: 0px 20px 26px 0px rgba(186, 182, 182, 0.16);
  padding: 3.13rem 2.19rem;
`;

const Title = styled.h4`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.blackBlack2};
`;

const MainContent = styled.p`
  font-weight: 400;
`;
