import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import styled from '@emotion/styled';

import LoadScreen from '../../components/Card/LoadScreen';
import useOnRefreshScreen from '../../hooks/auth/useOnRefreshScreen';
import DashboardHeader from './header/DashboardHeader';
import SettingsHeader from './SettingsHeader';
import Nav from './sideNav/Nav';

// import Nav from './sideNav/Nav';

const UsersDashboardLayout = () => {
  const { onRefreshScreen, loading } = useOnRefreshScreen();
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split('/');

  // State to manage Nav visibility
  const [isNavVisible, setIsNavVisible] = useState(false);

  // Toggle function for Nav visibility
  const toggleNavVisibility = () => {
    setIsNavVisible((prev) => !prev);
  };

  // Effect to handle screen size changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    // Listener function to set isNavVisible to false when screen is larger than 768px
    const handleScreenSizeChange = (event: MediaQueryListEvent) => {
      if (!event.matches) {
        setIsNavVisible(false);
      }
    };

    // Add event listener for screen size changes
    mediaQuery.addEventListener('change', handleScreenSizeChange);

    // Cleanup listener on component unmount.
    return () => {
      mediaQuery.removeEventListener('change', handleScreenSizeChange);
    };
  }, []);

  useEffect(() => {
    console.log('redering layout');
    onRefreshScreen();
  }, [onRefreshScreen]);

  console.log('Loading...', loading);
  if (loading) {
    console.log('Loading3...', loading);
    return <LoadScreen />;
  }

  return (
    <Container>
      <Nav isVisible={isNavVisible} onClose={toggleNavVisibility} />
      <Overlay isVisible={isNavVisible} />
      <Section isNavVisible={isNavVisible}>
        <DashboardHeader toggleNav={toggleNavVisibility} />
        {splitLocation[3] === 'settings' && <SettingsHeader />}
        <MainContent>
          <Outlet />
        </MainContent>
      </Section>
    </Container>
  );
};

export default UsersDashboardLayout;

const Container = styled.div`
  display: grid;
  grid-template-columns: 18rem auto;
  height: 100vh;
  width: 100vw;
  // border: 2px solid red;
  overflow: scroll;
  background-color: ${({ theme }) => theme.palette.backgroundColor};

  //mobile-specific styles
  @media (max-width: 768px) {
    grid-template-columns: auto; /
  }
`;

const Overlay = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  pointer-events: ${({ isVisible }) => (isVisible ? 'auto' : 'none')};
`;

const Section = styled.section<{ isNavVisible: boolean }>`
  // border: 2px solid yellow;
  width: 100%;

  //mobile-specific styles
  @media (max-width: 768px) {
    overflow-x: hidden;
    overflow-y: scroll;
    overflow: ${({ isNavVisible }) => (isNavVisible ? 'hidden' : 'auto')};
  }
`;

const MainContent = styled.main`
  // border: 2px solid red;
  /* margin: 2rem 6.25rem 5.69rem 3.38rem; */
  height: fit-content;

  & > *.default-margin,
  & > * > *.default-margin {
    margin: 2rem 6.25rem 5.69rem 3.38rem;
  }

  @media (max-width: 768px) {
    & > *.default-margin,
    & > * > *.default-margin {
      margin: 2rem 1rem 5.69rem 1rem;
    }
  }
`;
