import React from "react";
import styled from "@emotion/styled";

const ForgotPasswordSuccess = () => {
  return (
    <Container>
      <div>
        <div>
          <h3>Password reset link sent</h3>
          <p>
            A password reset link has been successfully sent to your email
            address
          </p>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  box-shadow: 0px 20px 26px 0px #bab6b629;
  margin-top: 5rem;
  width: 723px;
  height: 529px;
  top: 199px;
  left: 358px;
  padding: 119px 177px 118px 178px;
  border-radius: 12px;
  & > div {
    width: 368px;
    height: 292px;
    display: flex;
    flex-direction: column-reverse;
    & > div {
      width: 368px;
      height: 110px;
      & > h3 {
        color: ${({ theme }) => theme.palette.blackBlack2};
        font-size: 32px;
        font-weight: 500;
        line-height: 47.84px;
        letter-spacing: -0.02em;
        text-align: center;
      }
      & > p {
        color: ${({ theme }) => theme.palette.blackBlack3};
        font-size: 20px;
        font-weight: 400;
        line-height: 29.9px;
        letter-spacing: -0.02em;
        text-align: center;
      }
    }
  }
`;

export default ForgotPasswordSuccess;
