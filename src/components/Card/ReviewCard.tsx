import styled from '@emotion/styled';

import PlaceHolderCircle from '../Icons/PlaceHolderCircle';

export interface IReviewCard {
  title: string;
  description: string;
}

export const ReviewCard: React.FC<IReviewCard> = ({ title, description }) => {
  return (
    <Container>
      <HeadArea>
        <PlaceHolderCircle />
        <Title>{title}</Title>
      </HeadArea>
      <MainContent>{description}</MainContent>
    </Container>
  );
};

export default ReviewCard;

// styles
export const HeadArea = styled.div`
  display: flex;
  align-items: center;
  gap: 0.44rem;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  border-radius: 0.25rem;
  box-shadow: 0px 20px 26px 0px rgba(186, 182, 182, 0.16);
  padding: 1.94rem 1.06rem;

  &.showFooter {
    padding-bottom: 1.19rem;
  }
`;

export const Title = styled.h4`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.blackBlack2};
`;

export const MainContent = styled.p`
  font-weight: 400;
`;
