import React from 'react';

import styled from '@emotion/styled';

interface IRectangularPlanCard {
  title: string;
  description: string;
}

const RectangularPlanCard: React.FC<IRectangularPlanCard> = ({
  title,
  description,
}) => {
  return (
    <Container>
      <Title>{title}</Title>
      <MainContent>{description}</MainContent>
    </Container>
  );
};

export default RectangularPlanCard;

// styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.62rem;
  border-radius: 0.25rem;
  border: 1px solid var(--grey-grey-4, #f8f8f8);
  box-shadow: 0px 20px 26px 0px rgba(186, 182, 182, 0.16);
  padding: 2.69rem 3.19rem;
`;

const Title = styled.h4`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.blackBlack2};
`;

const MainContent = styled.p`
  font-weight: 400;
`;
