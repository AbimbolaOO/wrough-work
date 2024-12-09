import { useState } from "react";
import styled from "@emotion/styled";
import BookmarkIcon from "../../../components/Icons/BookmarkIcon";
import HeaderSettingsIcon from "../../../components/Icons/HeaderSettingsIcon";
import NotificationIcon from "../../../components/Icons/NotificationIcon";
import { InternalNavLink } from "../../../components/Link/Link";
import {
  BOOKMARKS,
  NOTIFICATIONS,
  UERS_SETTINGS,
} from "../../../routes/routeConstants";
import HeaderDropDown from "./HeaderDropDown";
import PostJobForm from "./PostJobForm";
import FullScreenModal from "../../../components/Modals/FullScreenModal";
import CompanyLogo from "../../../components/CompanyLogo/CompanyLogo";
import HamburgerIcon from "../../../components/Icons/HamburgerIcon";

const DashboardHeader = ({ toggleNav }: { toggleNav: () => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <LogoContainer>
        <CompanyLogo />
      </LogoContainer>
      <HamContainer className="" onClick={toggleNav}>
        <HamburgerIcon />
      </HamContainer>
      <CenterButton onClick={handleButtonClick}>Post a Job</CenterButton>
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
          <InternalNavLink to={`/${UERS_SETTINGS}`}>
            <HeaderSettingsIcon />
          </InternalNavLink>
        </IconWrapper>
        <IconWrapper>
          <HeaderDropDown />
        </IconWrapper>
      </IconsContainer>
      {isModalOpen && (
        <FullScreenModal closeAction={handleCloseModal}>
          <PostJobForm />
        </FullScreenModal>
      )}
    </Container>
  );
};

export default DashboardHeader;

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 5rem;
  padding-right: 6.25rem;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 1000;
  position: relative;

  //mobile-specific styles
  @media (max-width: 768px) {
    position: sticky;
    justify-content: space-between;
    padding-left: 20px;
    padding-right: 20px;
    z-index: 999;
  }
`;

const IconsContainer = styled.section`
  display: flex;
  gap: 2rem;

  //mobile-specific styles
  @media (max-width: 768px) {
    display: none;
  }
`;

const IconWrapper = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const CenterButton = styled.button`
  background-color: #2857d1;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  position: absolute;
  width: 180px;
  height: 40px;
  left: 40%;
  // transform: translateX(-50%);
  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    width: 123.96px;
    height: 27.77px;
    font-size: 11px;
    font-weight: 500;
    line-height: 13.77px;
  }
`;

const LogoContainer = styled.div`
  //mobile-specific styles
  @media (min-width: 769px) {
    display: none;
  }
`;

const HamContainer = styled.div`
  cursor: pointer;

  //mobile-specific styles
  @media (min-width: 769px) {
    display: none;
  }
`;
