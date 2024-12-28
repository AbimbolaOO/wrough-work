import styled from '@emotion/styled';

import CompanyLogo from '../../../components/CompanyLogo/CompanyLogo';
import BookmarkIcon from '../../../components/Icons/BookmarkIcon';
import HeaderSettingsIcon from '../../../components/Icons/HeaderSettingsIcon';
import MenuIcon from '../../../components/Icons/MenuIcon';
import NotificationIcon from '../../../components/Icons/NotificationIcon';
import { InternalNavLink } from '../../../components/Link/Link';
import { BOOKMARKS, NOTIFICATIONS, USERS_SETTINGS } from '../../../routes/routeConstants';
import HeaderDropDown from './HeaderDropDown';
import HeaderModalButton from './HeaderModalButton';

interface IHeader {
  open: boolean;
  toggleNav: (...arg: any) => void;
}

const DashboardHeader: React.FC<IHeader> = ({ open, toggleNav }) => {
  return (
    <Container>
      <OptionalLogo>
        <CompanyLogo goHome />
      </OptionalLogo>
      <HeaderModalButton>Post a Job</HeaderModalButton>
      <MenuButton onClick={() => toggleNav()}>
        <MenuIcon />
      </MenuButton>

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

  @media (max-width: 884px) {
    grid-template-columns: auto 1fr 24px;
    gap: 0;
    width: 100vw;
  }
`;

const IconsContainer = styled.section`
  display: flex;
  justify-self: flex-end;
  gap: 2rem;
  z-index: 2;

  @media (max-width: 884px) {
    display: none;
  }
`;

const IconWrapper = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

export const MenuButton = styled.div`
  display: none;
  background: none;
  outline: none;
  border: none;
  padding: 0;
  margin: 0;

  @media (max-width: 884px) {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
  }
`;

const OptionalLogo = styled.div`
  display: none;

  @media (max-width: 884px) {
    display: grid;
  }
`;
