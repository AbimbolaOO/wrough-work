import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';

import styled from '@emotion/styled';

import LoadScreen from '../../components/Card/LoadScreen';
import useOnRefreshScreen from '../../hooks/auth/useOnRefreshScreen';
import useDashboardLoading from '../../hooks/dashboard/dashboardLoading/useDashboardLoading';
import DashboardHeader from './header/DashboardHeader';
import SettingsHeader from './SettingsHeader';
import MobileNav from './sideNav/MobileNav';
import Nav from './sideNav/Nav';

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const { onRefreshScreen, loading, userId } = useOnRefreshScreen();
  const { getDashboardLoadingData, loading: dashboardDataLoading } =
    useDashboardLoading();

  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split('/');

  useEffect(() => {
    console.log('rendering layout');
    onRefreshScreen();
  }, [onRefreshScreen]);

  useEffect(() => {
    if (userId) {
      getDashboardLoadingData(userId);
    }
    // eslint-disable-next-line
  }, [userId]);

  if (loading || !userId || dashboardDataLoading) {
    return <LoadScreen />;
  }

  return (
    <Container>
      <Nav />
      <MobileNav
        open={open}
        toggleNav={() => {
          setOpen(!open);
        }}
      />
      <Section>
        <DashboardHeader
          open={open}
          toggleNav={() => {
            setOpen(!open);
          }}
        />
        {splitLocation[3] === 'settings' && <SettingsHeader />}
        <MainContent>
          <Outlet />
        </MainContent>
      </Section>
    </Container>
  );
};

export default DashboardLayout;

const Container = styled.div`
  display: grid;
  grid-template-columns: 294px 1fr;
  height: 100vh;
  overflow: auto;
  width: 100%;
  background-color: #f2f8fd;

  @media (max-width: 884px) {
    grid-template-columns: 1fr;
    width: 100vw;
  }
`;

const Section = styled.section`
  width: 100%;
  height: fit-content;

  & > * {
    padding-left: 54px;
    padding-right: 54px;
  }

  @media (max-width: 884px) {
    & > * {
      padding-left: 20px;
      padding-right: 20px;
    }
  }
`;

const MainContent = styled.main`
  height: 100%;
  width: 100%;
`;
