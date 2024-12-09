import React from "react";

import styled from "@emotion/styled";

import ActiveShifts from "./ActiveShifts/ActiveShifts";
import ApplicationStatistics from "./ApplicationStatistics/ApplicationStatistics";
import Banner from "./Banner/Banner";
import RecommendedJob from "./RecommendedJob/RecommendedJob";
import YourPostedJobs from "./YourPostedJobs/YourPostedJobs";

const DashboardHome = () => {
  return (
    <Container className="default-margin">
      <Banner />
      <ApplicationStatistics />
      <ContentGrid>
        <ActiveShifts />
        <YourPostedJobs />
      </ContentGrid>
      <RecommendedJob />
    </Container>
  );
};

export default DashboardHome;

const Container = styled.section`
  /* border: 2px solid green; */
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.75rem;

  //mobile-specific styles
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;
