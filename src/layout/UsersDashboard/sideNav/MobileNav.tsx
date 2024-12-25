import React, { useRef } from 'react';

import styled from '@emotion/styled';

import CompanyLogo from '../../../components/CompanyLogo/CompanyLogo';
import CloseIcon from '../../../components/Icons/CloseIcon';
import { NavBoxItem } from '../../../components/Link/Link';
import useOnLogout from '../../../hooks/auth/useOnLogout';
import { navConfig } from './navConfig';

interface IHamburgerMenu {
  open: boolean;
  toggleNav: (...arg: any) => void;
}

const MobileNav: React.FC<IHamburgerMenu> = ({ open, toggleNav }) => {
  const { logoutUser } = useOnLogout();
  const bgRef = useRef(null);
  const handleNavMenuItemClick = (_: any) => {
    toggleNav();
  };

  const handleBgClick = (e: any) => {
    if (bgRef && bgRef.current === e.target) {
      toggleNav();
    }
  };

  return (
    <MainContainer
      ref={bgRef}
      className={open ? '' : 'close'}
      onClick={handleBgClick}
    >
      <Container className={open ? '' : 'close'}>
        <Header>
          <CompanyLogo />
          <CloseIconContainer onClick={toggleNav}>
            <CloseIcon />
          </CloseIconContainer>
        </Header>

        <NavBtnSection onClick={handleNavMenuItemClick}>
          {navConfig.map((nav) => (
            <NavBoxItem path={nav.path} key={nav.title} icon={nav.icon}>
              {nav.title}
            </NavBoxItem>
          ))}

          <LogoutBox onClick={() => logoutUser()}>Logout</LogoutBox>
        </NavBtnSection>
      </Container>
    </MainContainer>
  );
};

export default MobileNav;

const MainContainer = styled.div`
  display: None;
  height: 100vh;
  position: fixed;
  background: rgba(17, 23, 29, 0.35);

  @media (max-width: 884px) {
    width: 100vw;
    display: flex;
    margin-left: auto;
    z-index: 2000;

    &.open {
      transform: translateY(0);
    }

    &.close {
      transform: translateY(-100%);
      opacity: 0;
      transition: transform 0s linear 0.3s, opacity 0.3s linear 0.1s;
    }
  }
`;

const Container = styled.nav`
  display: flex;
  padding: 24px 24px;
  background-color: white;
  transition: transform 0.3s linear;

  flex-direction: column;
  gap: 3.8rem;
  position: absolute;
  width: 100vw;
  height: 390px;
  top: 0;

  gap: 24px;

  &.open {
    transform: translateY(0);
  }

  &.close {
    transform: translateY(-100%);
  }
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CloseIconContainer = styled.div`
  display: grid;
  place-items: center;
  cursor: pointer;

  & > * {
    transition: transform 0.3s ease-in-out;
    &:hover {
      transform: scale(110%);
    }
  }
`;

const NavBtnSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const LogoutBox = styled.div`
  margin-top: auto;
  color: ${({ theme }) => theme.palette.greyGrey1};
  font-size: 1rem;
  font-weight: 400;
  display: flex;
  gap: 1.25rem;
  cursor: pointer;
  align-items: center;

  &:hover {
    color: ${({ theme }) => theme.palette.stateColorRed};
  }
`;
