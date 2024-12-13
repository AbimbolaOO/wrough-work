import React from 'react';
import { useNavigate } from 'react-router-dom';

import styled from '@emotion/styled';

import Img from '../../../../components/Img/Img';
import { useAppSelector } from '../../../../redux/store';
import { USERS_SETTINGS } from '../../../../routes/routeConstants';

const Banner = () => {
  const navigate = useNavigate();
  const { authData } = useAppSelector((state) => state.auth);

  return (
    <Container>
      <TextArea>
        <Header1>Hello</Header1>
        <p>
          To ensure the best experience for all users, we require the completion
          of your profile before accessing our platform's features and benefits.{' '}
        </p>
        <Navigation
          onClick={() =>
            navigate(`/${USERS_SETTINGS}`, {
              replace: true,
              state: { data: authData?.email },
            })
          }
        >
          Complete profile <Img src='/static/svg/bulletIcon.svg' alt='icon' />
        </Navigation>
      </TextArea>
      <ImageArea>
        <Img
          src='/static/svg/doctorAndPatient.svg'
          alt='doctor examining patient'
        />
      </ImageArea>
    </Container>
  );
};

export default Banner;

const Container = styled.section`
  border-radius: 0.625rem;
  display: flex;
  justify-content: space-between;
  color: white;
  background: rgba(122, 64, 242, 0.95);
  padding: 2.12rem 3.13rem;
  position: relative;
`;

const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 30rem;
  font-size: 1.125rem;
  gap: 0.5rem;
`;

const Header1 = styled.p`
  font-weight: 300;
  font-size: 1.5rem;
`;

const Navigation = styled.div`
  display: flex;
  gap: 0.5rem;
  color: ${({ theme }) => theme.palette.stateColorYellow};
  font-weight: 500;
  cursor: pointer;
`;

const ImageArea = styled.div`
  position: absolute;
  right: 3.13rem;
  bottom: 0;
`;
