import React from 'react';

import styled from '@emotion/styled';

const LoadScreen = () => {
  return (
    <Container>
      <div>
        <Img src="/static/img/largeCompanyLogo.png" alt="company logo" />
        <ProgressBar>
          <Background></Background>
          <LoadingIndicator></LoadingIndicator>
        </ProgressBar>
      </div>
    </Container>
  );
};

export default LoadScreen;

const Container = styled.div`
  display: grid;
  place-content: center;
  /* border: 2px solid red; */
  width: 100vw;
  height: 100vh;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
    flex-direction: column;
    /* border: 2px solid green; */
  }
`;

const ProgressBar = styled.div`
  display: grid;
  width: 448px;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;

  & > * {
    grid-column: 1;
    grid-row: 1;
    border-radius: 4px;
  }
`;

const Background = styled.div`
  background-color: #f3f3f6;
`;

const LoadingIndicator = styled.div`
  background-color: ${({ theme }) => theme.palette.mainBlue};
  animation-name: loader-motion;
  animation-duration: 1s;
  transform-origin: left;
  animation-fill-mode: backwards;
  animation-timing-function: linear;

  @keyframes loader-motion {
    from {
      transform: scaleX(0%);
    }
    to {
      transform: scaleX(100%);
    }
  }
`;

const Img = styled.img`
  width: 80px;
  height: 44px;
`;
