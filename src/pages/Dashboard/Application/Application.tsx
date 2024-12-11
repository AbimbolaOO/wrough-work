import React from 'react';

import styled from '@emotion/styled';

import PageBanner from '../../../components/Banner/PageBanner';
import ApplicationSegment from './ApplicationSegment/ApplicationSegment';

const Application = () => {
  return (
    <Container>
      <PageBanner
        label='Applications'
        description='Welcome to your application Dashboards'
      />
      <ApplicationSegment />
    </Container>
  );
};

export default Application;

const Container = styled.section`
  display: flex;
  gap: 32px;
  flex-direction: column;
  margin-bottom: 54px;
`;
