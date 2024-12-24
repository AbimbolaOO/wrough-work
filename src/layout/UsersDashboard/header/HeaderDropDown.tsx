import { useState } from 'react';

import styled from '@emotion/styled';

import { HoverDropDown } from '../../../components/DropDown/DropDown';
import DownArrowIcon from '../../../components/Icons/DownArrowIcon';
import IconImg from '../../../components/Img/IconImg';
import { InternalNavLink } from '../../../components/Link/Link';
import { Modal } from '../../../components/Modals/Modal';
import ProfileModal from '../../../components/Modals/ModalsActions/ProfileModal';
import ModalTriggerContainer from '../../../components/Modals/ModalTriggerContainer';
import { ModalProvider } from '../../../context/ModalContext';
import useOnLogout from '../../../hooks/auth/useOnLogout';
import { useAppSelector } from '../../../redux/store';
import { capitalize } from '../../../utils/utils';
import { headerConfig } from './headerConfig';

const DropDownLabel = ({ imgSrc }: { imgSrc: string }) => {
  return (
    <DropDownLabelContainer>
      <IconImg src={imgSrc} />
      <DownArrowIcon />
    </DropDownLabelContainer>
  );
};

const ShowProfileModal = ({ children }: { children: React.ReactNode }) => {
  return (
    <ModalProvider>
      <ModalTriggerContainer>
        <ShowProfile>{children}</ShowProfile>
      </ModalTriggerContainer>
      <Modal>
        <ProfileModal />
      </Modal>
    </ModalProvider>
  );
};

const HeaderDropDown = () => {
  const { logoutUser } = useOnLogout();
  const { authData } = useAppSelector((state) => state.auth);
  const [modal, setModal] = useState(false);

  const profileImageSrc =
    authData?.profileImage ?? '/static/svg/profilePlaceholder.svg';

  return (
    <HoverDropDown label={<DropDownLabel imgSrc={profileImageSrc} />}>
      <Container>
        <HoverDropDownContentCell className='default-cursor'>
          <IconImg src={profileImageSrc} />
          <UserInfoArea>
            <p>{capitalize(authData?.firstName ?? '')}</p>
            <Description>Tier 2 account</Description>
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
              <HoverDropDownContentCell key={index}>
                <ShowProfileModal>
                  {data.icon} <p>{data.title}</p>
                </ShowProfileModal>
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
  width: 100%;

  &.default-cursor {
    cursor: default;
  }
`;

const UserInfoArea = styled.div`
  /* border: 2px solid red; */
  /* cursor: default; */
`;

const Description = styled.div`
  display: flex;
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 300;
  color: ${({ theme }) => theme.palette.greyGrey1};
`;

const ShowProfile = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
`;
