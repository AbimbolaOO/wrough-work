import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { HoverDropDown } from '../../../components/DropDown/DropDown';
import DownArrowIcon from '../../../components/Icons/DownArrowIcon';
import IconImg from '../../../components/Img/IconImg';
import { InternalNavLink } from '../../../components/Link/Link';
import FullScreenModal from '../../../components/OldModals/FullScreenModal';
import PopupProfile from '../../../components/PopupProfile/PopupProfile';
import useOnLogout from '../../../hooks/auth/useOnLogout';
import useGetUserData from '../../../hooks/getData/useGetUserData';
import { headerConfig } from './headerConfig';

const DropDownLabel = () => {
  return (
    <DropDownLabelContainer>
      <IconImg src='/static/img/PlaceholderUserImage.png' />
      <DownArrowIcon />
    </DropDownLabelContainer>
  );
};

const HeaderDropDown = () => {
  const { logoutUser } = useOnLogout();
  const { userData } = useGetUserData();
  const [modal, setModal] = useState(false);

  const showModal = () => {
    setModal(true);
  };

  useEffect(() => {
    setModal(false);
  }, []);

  return (
    <HoverDropDown label={<DropDownLabel />}>
      <Container>
        <HoverDropDownContentCell>
          <IconImg src='/static/img/PlaceholderUserImage.png' />
          <UserInfoArea>
            <p>{userData?.firstName}</p>
            <Description>Teir 2 account</Description>
          </UserInfoArea>
        </HoverDropDownContentCell>
        {headerConfig.map((data, index) => {
          if (data.title === 'Logout') {
            return (
              <HoverDropDownContentCell
                onClick={() => logoutUser()}
                key={index}
              >
                {data.icon} <p>{data.title}</p>
              </HoverDropDownContentCell>
            );
          }
          if (data.title === 'View Profile') {
            return (
              <HoverDropDownContentCell onClick={() => showModal()} key={index}>
                {data.icon} <p>{data.title}</p>
              </HoverDropDownContentCell>
            );
          }
          return (
            <InternalNavLink to={data.path} key={index}>
              <HoverDropDownContentCell>
                {data.icon} <p>{data.title}</p>
              </HoverDropDownContentCell>
            </InternalNavLink>
          );
        })}
      </Container>
      {modal ? (
        <FullScreenModal
          closeAction={() => {
            setModal(false);
          }}
        >
          <PopupProfile forApplicant={false} />
        </FullScreenModal>
      ) : (
        ''
      )}
    </HoverDropDown>
  );
};

export default HeaderDropDown;

const Container = styled.div`
  width: 16.4375rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  cursor: default;
`;

const DropDownLabelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const HoverDropDownContentCell = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  color: ${({ theme }) => theme.palette.blackBlackMain};
  font-weight: 400;
  cursor: pointer;
`;

const UserInfoArea = styled.div`
  /* border: 2px solid red; */
`;

const Description = styled.div`
  display: flex;
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 300;
  color: ${({ theme }) => theme.palette.greyGrey1};
`;
