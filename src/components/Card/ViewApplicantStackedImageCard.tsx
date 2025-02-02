import React from 'react';
import { useNavigate } from 'react-router';

import styled from '@emotion/styled';

import { DEFAULT_IMAGE_URL } from '../../utils/utils';
import Img from '../Img/Img';

interface ViewApplicantStackedImageCardProps {
  navUrl: string;
}

const ViewApplicantStackedImageCard: React.FC<
  ViewApplicantStackedImageCardProps
> = ({ navUrl }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <ImageStack count='+4'>
        <div>
          <Img src={DEFAULT_IMAGE_URL} alt='image' />
        </div>
        <div data-offset='1'>
          <Img src={DEFAULT_IMAGE_URL} alt='image' />
        </div>
        <div data-offset='2'>
          <Img src={DEFAULT_IMAGE_URL} alt='image' />
        </div>
        <div data-offset='3'>
          <Img src={DEFAULT_IMAGE_URL} alt='image' />
        </div>
      </ImageStack>
      <ViewApplicant onClick={() => navigate(navUrl)}>
        View all applicants
      </ViewApplicant>
    </Container>
  );
};

export default ViewApplicantStackedImageCard;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 8px;
`;

interface IImageStack {
  count: string;
}
const ImageStack = styled.div<IImageStack>`
  display: grid;
  grid-template-columns: repeat(4, 50px);
  margin-left: 25px;

  & > div {
    border: 2px solid transparent;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-color: lightgray;
    cursor: pointer;
  }

  & > div:hover {
    border: 2px solid ${({ theme }) => theme.palette.mainBlue};
    z-index: 10;
  }

  /* & > div:not(:first-of-type) {
    border: 1px solid blue;
  } */

  & > div[data-offset='1'] {
    transform: translateX(-8px);
    z-index: 2;

    &:hover {
      z-index: 10;
    }
  }

  & > div[data-offset='2'] {
    transform: translateX(-16px);
    z-index: 3;

    &:hover {
      z-index: 10;
    }
  }

  & > div[data-offset='3'] {
    transform: translateX(-24px);
    z-index: 4;

    &:hover {
      z-index: 10;
    }
  }

  & > div:last-of-type {
    position: relative;

    /* transform: translateX(8px); */
  }

  & > div:last-of-type:after {
    color: white;
    /* content: '34'; */
    content: ${({ count }) => (count ? `"${count}"` : '23')};
    font-size: 14px;
    font-weight: 600;
    position: absolute;
    top: calc(30%);
    right: calc(40%);
  }
`;

const ViewApplicant = styled.div`
  color: ${({ theme }) => theme.palette.mainBlue};
  font-size: 14px;
  cursor: pointer;
`;
