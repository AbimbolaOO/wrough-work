import React from 'react';

import styled from '@emotion/styled';

import Banner from '../../../components/Banner/Banner';
import ApplicationSegment from './ApplicationSegment/ApplicationSegment';

const Application = () => {
  return (
    <Container>
      <Banner
        title='Applications'
        description='Welcome to your application Dashboards'
      />
      <ApplicationSegment />
    </Container>
  );
};

export default Application;

const Container = styled.section`
  display: flex;
  flex-direction: column;

  //mobile-specific styles
  @media (max-width: 768px) {
    overflow-x: hidden;
  }
`;
