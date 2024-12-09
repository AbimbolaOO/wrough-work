import React from 'react';

import styled from '@emotion/styled';

const ApplicationPageBanner = () => {
  return (
    <Container>
      <Header>Hello</Header>
      <TextArea>
        To ensure the best experience for all users, we require the completion
        of your profile before accessing our platform's features and benefits.{' '}
      </TextArea>
    </Container>
  );
};

export default ApplicationPageBanner;

const Container = styled.section`
  border: 2px solid blue;
  width: 100%;
  background-color: lime;
`;

const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 30rem;
  font-size: 1.125rem;
  gap: 0.5rem;
`;

const Header = styled.p`
  font-weight: 300;
  font-size: 1.5rem;
`;
