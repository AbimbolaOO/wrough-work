import React from 'react';

import styled from '@emotion/styled';

import EmptyState from '../../../../components/Card/EmptyState';
import NotificationCard from '../../../../components/Card/NotificationCard';
import { NotificationData } from './NotificationData';

const NotificationList = () => {
  return (
    <Container>
      {NotificationData.length !== 0 ? (
        NotificationData.map((data, index) => (
          <NotificationCard
            key={index}
            message={data.message}
            img={data.image}
            time={data.time}
          />
        ))
      ) : (
        <EmptyState>You currently do not have any notifications yet</EmptyState>
      )}
    </Container>
  );
};

export default NotificationList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 12px;
`;
