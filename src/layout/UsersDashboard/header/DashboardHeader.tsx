import styled from '@emotion/styled';

import BookmarkIcon from '../../../components/Icons/BookmarkIcon';
import HeaderSettingsIcon from '../../../components/Icons/HeaderSettingsIcon';
import NotificationIcon from '../../../components/Icons/NotificationIcon';
import { InternalNavLink } from '../../../components/Link/Link';
import {
  BOOKMARKS,
  NOTIFICATIONS,
  USERS_SETTINGS,
} from '../../../routes/routeConstants';
import HeaderDropDown from './HeaderDropDown';
import HeaderModalButton from './HeaderModalButton';

const DashboardHeader = ({ toggleNav }: { toggleNav: () => void }) => {
  return (
    <Container>
      <HeaderModalButton>Post a Job</HeaderModalButton>

      <IconsContainer>
        <IconWrapper>
          <InternalNavLink to={`/${BOOKMARKS}`}>
            <BookmarkIcon />
          </InternalNavLink>
        </IconWrapper>

        <IconWrapper>
          <InternalNavLink to={`/${NOTIFICATIONS}`}>
            <NotificationIcon />
          </InternalNavLink>
        </IconWrapper>

        <IconWrapper>
          <InternalNavLink to={`/${USERS_SETTINGS}`}>
            <HeaderSettingsIcon />
          </InternalNavLink>
        </IconWrapper>

        <IconWrapper>
          <HeaderDropDown />
        </IconWrapper>
      </IconsContainer>
    </Container>
  );
};

export default DashboardHeader;

const Container = styled.div`
  height: 5rem;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 1000;
  display: grid;
  grid-template-columns: auto 282px;
  align-items: center;
  gap: 32px;
`;

const IconsContainer = styled.section`
  display: flex;
  justify-self: flex-end;
  gap: 2rem;
  z-index: 2;
`;

const IconWrapper = styled.div`
  &:hover {
    cursor: pointer;
  }
`;
