import React from 'react';

import styled from '@emotion/styled';

import ProfileSettingsBottomSection from './ProfileSettingsBottomSection/ProfileSettingsBottomSection';
import ProfileSettingsTopSection from './ProfileSettingsTopSection/ProfileSettingsTopSection';

const ProfileSettings = () => {
  return (
    <Container>
      <ProfileSettingsTopSection />
      <ProfileSettingsBottomSection />
    </Container>
  );
};

export default ProfileSettings;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  color: ${({ theme }) => theme.palette.blackBlack2};
  font-size: 1.125rem;

  & > * {
    border: 1px solid ${({ theme }) => theme.palette.borderColor};
    border-radius: 0.375rem;
  }
`;
