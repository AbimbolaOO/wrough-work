import styled from '@emotion/styled';

import CompanyLogo from '../../../components/CompanyLogo/CompanyLogo';
import LogoutIcon from '../../../components/Icons/LogoutIcon';
import { NavBoxItem } from '../../../components/Link/Link';
import useOnLogout from '../../../hooks/auth/useOnLogout';
import { navConfig } from './navConfig';

const Nav = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  const { logoutUser } = useOnLogout();

  return (
    <Container>
      <div className='logo'>
        <CompanyLogo />
      </div>

      <NavBtnSection>
        {navConfig.map((nav) => (
          // <NavBoxItem
          //   path={nav.path}
          //   key={nav.title}
          //   icon={nav.icon(isVisible)}
          //   clicked={isVisible && onClose}
          // >
          //   {nav.title}
          // </NavBoxItem>

          <NavBoxItem path={nav.path} key={nav.title} icon={nav.icon}>
            {nav.title}
          </NavBoxItem>
        ))}
      </NavBtnSection>

      <LogoutBox onClick={() => logoutUser()}>
        {!isVisible && <LogoutIcon />} Logout
      </LogoutBox>
    </Container>
  );
};

export default Nav;

const Container = styled.nav`
  /* border: 2px solid blue; */
  padding: 52px 32px 72px;
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
    margin-left: 24px;
  }
`;

const NavBtnSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
