import styled from "@emotion/styled";

import CompanyLogo from "../../../components/CompanyLogo/CompanyLogo";
import LogoutIcon from "../../../components/Icons/LogoutIcon";
import { NavBoxItem } from "../../../components/Link/Link";
import useOnLogout from "../../../hooks/auth/useOnLogout";
import { navConfig } from "./navConfig";
import CloseIcon from "../../../components/Icons/CloseIcon";

const Nav = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  const { logoutUser } = useOnLogout();

  return (
    <Container isVisible={isVisible}>
      <div>
        <CompanyLogo />
        <CloseContainer>
          <CloseIcon onClick={onClose} />
        </CloseContainer>
      </div>
      <NavbtnsSection>
        {navConfig.map((nav) => (
          <NavBoxItem
            path={nav.path}
            key={nav.title}
            icon={nav.icon(isVisible)}
            clicked={isVisible && onClose}
          >
            {nav.title}
          </NavBoxItem>
        ))}
      </NavbtnsSection>

      <LogoutBox onClick={() => logoutUser()}>
        {!isVisible && <LogoutIcon />} Logout
      </LogoutBox>
    </Container>
  );
};

export default Nav;

const Container = styled.nav<{ isVisible: boolean }>`
  // border: 2px solid blue;
  padding: 2rem 2rem 3.75rem 2rem;
  display: flex;
  background-color: white;

  flex-direction: column;
  gap: 3.8rem;
  height: 100vh;
  position: sticky;
  top: 0;

  & > a > div {
    margin-left: 1rem;
  }

  & > div {
  }

  //mobile-specific styles
  @media (max-width: 768px) {
    position: fixed;
    width: 100%;
    z-index: 1000;
    top: ${({ isVisible }) => (isVisible ? "0" : "-100%")};
    // transition: top 0.05s ease-in-out;
    padding: 0;
    height: 327px;
    gap: 0;

    & > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.2rem;
    }
  }
`;

const NavbtnsSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  //mobile-specific styles
  @media (max-width: 768px) {
    gap: 0;
  }
`;

const LogoutBox = styled.div`
  margin-top: auto;
  color: ${({ theme }) => theme.palette.greyGrey2};
  font-size: 1rem;
  font-weight: 400;
  display: flex;
  gap: 1.25rem;
  cursor: pointer;

  //mobile-specific styles
  @media (max-width: 768px) {
    width: fit-content;
    font-size: 14px;
    color: ${({ theme }) => theme.palette.blackBlack2};
  }
`;

const CloseContainer = styled.div`
  display: none;

  //mobile-specific styles
  @media (max-width: 768px) {
    display: block;
    width: 24px;
  }
`;
