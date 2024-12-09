import React from "react";

import styled from "@emotion/styled";

import { ButtonLink } from "../Link/Link";

const CompanyLogo = () => {
  return (
    <ButtonLink to="https://locumspace.co/" target="_blank">
      <Container>
        <img src="/static/svg/companyLogo.svg" alt="Company" />
      </Container>
    </ButtonLink>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.12rem;
  font-weight: 500;
  color: black;
  width: fit-content;

  //mobile-specific styles
  @media (max-width: 768px) {
    width: 54px;
    height: 26px;
  }
`;

export default CompanyLogo;
