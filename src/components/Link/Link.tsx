import { NavLink as RouterLink } from "react-router-dom";

import styled from "@emotion/styled";

export const InternalNavLink = styled(RouterLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.palette.greyGrey1};
  font-weight: 400;

  &.footer {
    color: ${({ theme }) => theme.palette.blackBlack3};
  }
  &.regular {
    color: ${({ theme }) => theme.palette.purplePurple1};
    margin-left: 4px;
  }
`;

export const ButtonLink = styled(RouterLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.palette.greyGrey1};
  font-weight: 500;
`;

interface INavItem {
  icon: React.ReactNode;
  children: string;
  path: string;
  clicked?: (() => void) | false;
}

export const NavBoxItem: React.FC<INavItem> = ({
  icon,
  path,
  clicked,
  children,
}) => {
  const handleClick = () => {
    if (clicked && typeof clicked === "function") {
      clicked();
    }
  };

  return (
    <NavigationBoxLink
      onClick={handleClick}
      className={(navData) => (navData.isActive ? "active" : "")}
      to={path}
    >
      {icon}
      {children}
    </NavigationBoxLink>
  );
};

export const NavigationBoxLink = styled(RouterLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.palette.greyGrey2};
  display: flex;
  gap: 1.25rem;

  padding: 0.81rem 1.31rem;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 400;
  display: flex;
  align-items: center;

  &:hover {
    color: ${({ theme }) => theme.palette.greyGrey1};
  }

  &.active {
    background-color: #2858d128;
    color: ${({ theme }) => theme.palette.mainBlue};
  }

  //mobile-specific styles
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 23.92px;
    width: fit-content;

    &.active {
      background-color: inherit;
      color: ${({ theme }) => theme.palette.mainBlue};
    }
  }
`;

export const ExternalLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.palette.purplePurple1};
`;
