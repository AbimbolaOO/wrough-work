import React from 'react';

import styled from '@emotion/styled';

import Banner from '../../../components/Banner/Banner';
import NotificationList from './NotificationList/NotificationList';

const Notifications = () => {
  return (
    <Container>
      <Banner
        title='Applications'
        description='Welcome to your application Dashboards'
      />
      <NotificationList />
    </Container>
  );
};

export default Notifications;

const Container = styled.div``;
