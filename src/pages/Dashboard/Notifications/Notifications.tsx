import React from 'react';

import styled from '@emotion/styled';

import PageBanner from '../../../components/Banner/PageBanner';
import NotificationList from './NotificationList/NotificationList';

const Notifications = () => {
  return (
    <Container>
      <PageBanner
        label='Notifications'
        description='Welcome to your notification dashboard'
      />
      <NotificationList />
    </Container>
  );
};

export default Notifications;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
