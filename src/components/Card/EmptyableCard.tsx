import React from 'react';

import styled from '@emotion/styled';

import Img from '../Img/Img';

interface IEmptyableCard {
  label: string | React.ReactNode;
  children?: React.ReactNode;
  emptyViewNote: string | React.ReactNode; //| any;
  className?: string;
  viewAllClick?: any;
}
const EmptyableCard: React.FC<IEmptyableCard> = ({
  label,
  emptyViewNote,
  children,
  className,
  viewAllClick,
}) => {
  const isEmpty = React.Children.count(children) === 0;
  return (
    <Container>
      <Label>
        {label} {!isEmpty && <span onClick={viewAllClick}>View all</span>}
      </Label>

      <ContentContainer className={className}>
        {isEmpty ? (
          <EmptyWrapper>
            <EmptyWrapperImage>
              <Img src='/static/gif/happyAnimal.gif' alt='no content' />
            </EmptyWrapperImage>
            <P>{emptyViewNote}</P>
          </EmptyWrapper>
        ) : (
          <NonEmptyContentWrapper className={className}>
            {children}
          </NonEmptyContentWrapper>
        )}
      </ContentContainer>
    </Container>
  );
};

export default EmptyableCard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.div`
  color: ${({ theme }) => theme.palette.blackBlack3};
  font-weight: 500;
  font-size: 1.125rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & span {
    color: #2857d1;
    font-weight: 400;
    font-size: 18px;
    cursor: pointer;
  }
`;

const ContentContainer = styled.div`
  background-color: white;
  border-radius: 0.625rem;
  display: flex;
  flex-direction: column;
  height: 27.875rem;

  &.biggerPadding {
    height: fit-content;
  }

  @media (max-width: 884px) {
    width: 100%;
  }
`;

const EmptyWrapper = styled.div`
  padding: 5rem;
  margin: auto;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const EmptyWrapperImage = styled.div`
  width: 12.5rem;
  height: 12.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NonEmptyContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1rem;
  overflow-y: auto;

  &.biggerPadding {
    padding: 2rem;
  }

  @media (max-width: 884px) {
    &.biggerPadding {
      padding: 1rem;
    }
  }
`;

const P = styled.p`
  text-align: center;
  display: flex;
  align-items: center;
`;
