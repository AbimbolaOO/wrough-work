import React from 'react';

import styled from '@emotion/styled';

import StarIcon from '../Icons/StarIcon';

interface IReviewStars {
  starNumbers: number;
}

const ReviewStars: React.FC<IReviewStars> = ({ starNumbers }) => {
  const elements = Array.from({ length: starNumbers }, (_, index) => index);
  return (
    <StarArea>
      {elements.map((_, index) => (
        <StarIcon key={index} />
      ))}
    </StarArea>
  );
};

export default ReviewStars;

// styles
const StarArea = styled.div`
  display: flex;
`;
