import React, { useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';

import { jobAppDataType } from '../../models/jobApp/jobApp.model';
import { calculateTimeAgo } from '../../utils/utils';
import DoubleCheckIcon from '../Icons/DoubleCheckIcon';
import FolderIcon from '../Icons/FolderIcon';
import HorizontalDotsMenuIcon from '../Icons/HorizontalDotsMenuIcon';
import PhoneIcon from '../Icons/PhoneIcon';
import ProfileIcon from '../Icons/ProfileIcon';
import ReminderIcon from '../Icons/ReminderIcon';
import TrashIcon from '../Icons/TrashIcon';
import FullScreenModal from '../OldModals/FullScreenModal';
import PopupProfile from '../PopupProfile/PopupProfile';

interface ViewAllAppsCardProps extends jobAppDataType {
  imgSrc?: string;
  interview?: boolean;
  accepted?: boolean;
  accept?: any;
  reject?: any;
}

const ViewAllAppsCard: React.FC<ViewAllAppsCardProps> = ({
  imgSrc,
  interview,
  firstName,
  lastName,
  createdAt,
  accept,
  reject,
  userId,
  accepted,
}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const [profileOpen, setProfileOpen] = useState(false);

  const [activeButton, setActiveButton] = useState<string>('Experience');

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    console.log(newDate);
  };

  const toggleModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setIsModalOpen(false);
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <Container>
      {profileOpen && (
        <FullScreenModal
          closeAction={() => {
            setProfileOpen(false);
          }}
        >
          <PopupProfile
            forApplicant={true}
            selectedButton={activeButton}
            applicantId={userId ? userId : undefined}
          />
        </FullScreenModal>
      )}
      <UpSection>
        <div>
          <div>
            <img src={imgSrc} alt='' />
          </div>
          <p>
            <span>
              {firstName} {lastName}
            </span>
            <br />
            <small>
              <span>Applied </span>
              {createdAt ? <>{calculateTimeAgo(createdAt)} ago</> : 'N/A'}
            </small>
          </p>
        </div>
        <span onClick={toggleModal}>
          <HorizontalDotsMenuIcon />
        </span>
        {isModalOpen && (
          <PopUp onClick={(e) => e.stopPropagation()} ref={modalRef}>
            <p>
              {accepted ? (
                <span className='accept'>
                  <ReminderIcon /> Send reminder
                </span>
              ) : (
                <span onClick={accept}>
                  <DoubleCheckIcon /> Accept
                </span>
              )}
            </p>
            <p>
              {accepted ? (
                <span className='accept'>
                  <PhoneIcon /> Contact locum
                </span>
              ) : (
                <span onClick={reject}>
                  <TrashIcon /> Reject
                </span>
              )}
            </p>
          </PopUp>
        )}
      </UpSection>
      <DownSection>
        {interview && !accepted ? (
          <p>
            <input type='checkbox' />
            <span>Pick this candidate</span>
          </p>
        ) : accepted ? (
          <Accept>Accepted</Accept>
        ) : (
          <div>
            <p
              onClick={() => {
                setActiveButton('Experience');
                setProfileOpen(!profileOpen);
              }}
            >
              <ProfileIcon />
            </p>
            <p
              onClick={() => {
                setActiveButton('Licenses');
                setProfileOpen(!profileOpen);
              }}
            >
              {' '}
              <FolderIcon />
            </p>
            <StyledDateInput
              type='date'
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
        )}
      </DownSection>
    </Container>
  );
};

const Container = styled.div`
  box-shadow: 0px 20px 26px 0px #bab6b629;
  width: 16rem;
  min-width: 16rem;
  height: 7rem;
  top: 307px;
  left: 40px;
  gap: 0px;
  border-radius: 6px;

  //mobile-specific styles
  @media (max-width: 768px) {
    background-color: ${({ theme }) => theme.palette.white};
    width: 100%;
  }
`;

const UpSection = styled.div`
  width: 100%;
  height: 60%;
  position: relative;
  border-bottom: 1px solid rgba(189, 189, 189, 0.5);
  & > span {
    position: absolute;
    top: 5%;
    right: 5%;
    color: #828282;
  }
  & > div {
    position: absolute;
    width: 161px;
    height: 52px;
    top: 8px;
    left: 16px;
    gap: 6px;
    opacity: 0px;
    display: flex;
    justify-content: start;
    align-items: center;
    & > div {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      justify-content: start;
      align-items: center;
      overflow: hidden;
      & > img {
        width: 100%;
        height: auto;
      }
    }
    & > p {
      flex-grow: 1;
      height: 100%;
      & > span {
        font-size: 16px;
        font-weight: 400;
        white-space: nowrap;
      }
      & > small {
        font-size: 12px;
        font-weight: 400;
        color: #828282;
        white-space: nowrap;
      }
    }
  }
`;

const DownSection = styled.div`
  height: 40%;
  position: relative;
  & > div {
    position: absolute;
    width: 92px;
    height: 20px;
    top: 30%;
    right: 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > p {
      & > svg {
        width: 20px;
        height: 20px;
        cursor: pointer;
        color: #828282;
      }
    }
  }
  & > p {
    height: 100%;
    display: flex;
    gap: 0.7rem;
    justify-content: start;
    align-items: center;
    padding-left: 1rem;
    & span {
      font-size: 12px;
      font-weight: 400;
    }
    & > input {
      width: 16px;
    }
  }
`;

const Accept = styled.span`
  width: fit-content;
  width: 6rem;
  margin-top: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.lightLemon};
  padding-left: 0rem;
  margin-left: 3rem;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 300;
  line-height: 26.91px;
  letter-spacing: -1px;
  text-align: left;
`;

const StyledDateInput = styled.input`
  appearance: none;
  background: none;
  border: none;
  cursor: pointer;
  width: 20px;
  height: 20px;
  position: relative;
  &::-webkit-calendar-picker-indicator {
    opacity: 0;
  }
  &::before {
    position: absolute;
    top: 1%;
    content: '';
    display: block;
    width: 20px;
    height: 20px;
    background: currentColor;
    color: #828282;
    mask: url('data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M7 10h5v5H7zm6 0h5v5h-5zM19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" /></svg>')
      no-repeat center / contain;
  }

  &:focus {
    outline: none;
    cursor: pointer;
  }
`;

const PopUp = styled.p`
  box-shadow: 0px 2px 6px -1px rgba(0, 0, 0, 0.1);
  // border: 1px solid #e9eeef;
  position: absolute;
  bottom: 100%;
  right: 0;
  width: 12rem;
  height: 6rem;
  border-radius: 10px;
  background-color: white;
  & > p {
    width: 100%;
    height: 50%;
    padding-left: 1rem;
    display: flex;
    gap: 1rem;
    justify-content: start;
    align-items: center;
    font-size: 16px;
    font-weight: 400;
    & > span {
      width: fit-content;
      height: 100%;
      display: flex;
      gap: 1rem;
      justify-content: start;
      align-items: center;
      cursor: pointer;
      & > svg {
        width: 16px;
        height: 16px;
      }
    }
  }
  & > p:nth-of-type(1) {
    & .accept {
      color: ${({ theme }) => theme.palette.stateColorYellow};
    }
    padding-top: 1rem;
    border-bottom: 1px solid #e9eeef;
  }
  & > p:nth-of-type(2) {
    & .accept {
      color: ${({ theme }) => theme.palette.mainBlue};
    }
    padding-bottom: 1rem;
    color: #e01d1d;
  }

  //mobile-specific styles
  @media (max-width: 768px) {
    width: 8rem;
    height: 4rem;
    & > p {
      font-size: 13px;

      & .accept {
        gap: 0.2rem;
        justify-content: start;
        align-items: center;
      }
    }
    & > p:nth-of-type(1) {
      padding-bottom: 1rem;
    }
    & > p:nth-of-type(2) {
      padding-top: 1rem;
      color: #e01d1d;
    }
  }
`;

export default ViewAllAppsCard;
