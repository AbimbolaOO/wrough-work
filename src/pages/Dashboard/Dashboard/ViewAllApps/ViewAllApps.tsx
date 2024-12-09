import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { LoadingOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import ViewAllAppsCard from '../../../../components/Card/ViewAllAppsCard';
import BriefcaseIcon from '../../../../components/Icons/BriefcaseIcon';
import LeftArrowButtonIcon from '../../../../components/Icons/LeftArrowButtonIcon';
import FullScreenModal from '../../../../components/OldModals/FullScreenModal';
// import { truncateText } from "../../../../utils/utils";
import useGetAllAppsSingleJob from '../../../../hooks/getData/useGetAllAppsSingleJob';
import useGetSingleJob from '../../../../hooks/getData/useGetSingleJob';
import usePatchApplicationStatus from '../../../../hooks/patchData/usePatchApplicationStatus';
import PostJobForm from '../../../../layout/UsersDashboard/header/PostJobForm';
import { MANAGE_POSTED_JOBS } from '../../../../routes/routeConstants';
import RichTextDisplay from '../../../../utils/RichTextDisplay';

export default function ViewAllApps() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState<string>('SUBMITTED');

  // state to edit job
  const [edit, setEdit] = useState<boolean>(false);

  const [interview, setInterview] = useState(false);

  const { jobId } = useParams();

  const { loading, jobData, refetch } = useGetSingleJob(jobId);

  const {
    loading: appsLoading,
    appsData,
    refetch: refetchApps,
  } = useGetAllAppsSingleJob(jobId, true);

  const { updateAppStatus } = usePatchApplicationStatus(jobId ? jobId : ''); // TODO: Refactor this if possible to make sure it does not bring a bug

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
    if (buttonName === 'INTERVIEW') {
      setInterview(true);
    } else {
      setInterview(false);
    }
  };

  // handle edit click
  const handleEdit = () => {
    setEdit(!edit);
  };

  // After a successful edit, call refetch to update the job data
  const handleEditSuccess = () => {
    refetch(); // This will fetch the updated job data
    handleEdit();
  };

  const handleUpdateAppStatus = async (appId: string, data: string) => {
    await updateAppStatus(appId, { status: data });
    refetchApps();
  };

  return (
    <Container className='default-margin'>
      {edit && (
        <FullScreenModal closeAction={handleEdit}>
          <PostJobForm editData={jobData} onSuccess={handleEditSuccess} />
        </FullScreenModal>
      )}
      <Back
        onClick={() => {
          navigate(`/${MANAGE_POSTED_JOBS}`);
        }}
      >
        <LeftArrowButtonIcon /> <span>Back to Jobs</span>
      </Back>
      {loading ? (
        <LoadingOutlined />
      ) : (
        <Header>
          <h3>
            {jobData?.title}{' '}
            <StyledButton
              onClick={handleEdit}
              className='edit'
              isActive={true}
              disabled={
                appsData.length >= 1 &&
                appsData.some((app) => app.status !== 'REJECTED')
                  ? true
                  : false
              }
            >
              edit job
            </StyledButton>
          </h3>
          <p>
            <p>
              <RichTextDisplay
                richTextContent={
                  jobData?.jobDescription.jobDescription
                    ? jobData?.jobDescription.jobDescription
                    : ''
                }
              />
            </p>
          </p>
          <div>
            <span>
              <BriefcaseIcon /> {jobData?.yearsOfExperience}years+
            </span>
            <span>
              {jobData?.pay.toLocaleString('en-NG', {
                style: 'currency',
                currency: 'NGN',
              })}
              /{jobData?.payInterval}
            </span>
          </div>
        </Header>
      )}
      {loading ? '' : <hr />}
      <CardContainer>
        <div>
          <StyledButton
            isActive={activeButton === 'SUBMITTED'}
            onClick={() => handleButtonClick('SUBMITTED')}
          >
            Applicants
          </StyledButton>
          <StyledButton
            isActive={activeButton === 'SCREENING'}
            onClick={() => handleButtonClick('SCREENING')}
          >
            Screening
          </StyledButton>
          <StyledButton
            isActive={activeButton === 'INTERVIEW'}
            onClick={() => handleButtonClick('INTERVIEW')}
          >
            Interview
          </StyledButton>
        </div>
        {appsLoading ? (
          <LoadingOutlined />
        ) : (
          <CardsSection>
            {activeButton === 'SUBMITTED' ? (
              <>
                {appsData.map(
                  (app, index) =>
                    app.status === 'SUBMITTED' && (
                      <ViewAllAppsCard
                        key={index}
                        firstName={app.firstName}
                        lastName={app.lastName}
                        email={app.email}
                        createdAt={app.createdAt}
                        interview={interview}
                        userId={app.userId}
                        accept={
                          app.id && jobId
                            ? () =>
                                handleUpdateAppStatus(
                                  app.id as string,
                                  'SCREENING'
                                )
                            : undefined
                        }
                        reject={
                          app.id && jobId
                            ? () =>
                                handleUpdateAppStatus(
                                  app.id as string,
                                  'REJECTED'
                                )
                            : undefined
                        }
                      />
                    )
                )}
              </>
            ) : activeButton === 'SCREENING' ? (
              <>
                {appsData.map(
                  (app, index) =>
                    app.status === 'SCREENING' && (
                      <ViewAllAppsCard
                        key={index}
                        firstName={app.firstName}
                        lastName={app.lastName}
                        email={app.email}
                        createdAt={app.createdAt}
                        interview={interview}
                        accept={
                          app.id && jobId
                            ? () =>
                                handleUpdateAppStatus(
                                  app.id as string,
                                  'INTERVIEW'
                                )
                            : undefined
                        }
                        reject={
                          app.id && jobId
                            ? () =>
                                handleUpdateAppStatus(
                                  app.id as string,
                                  'REJECTED'
                                )
                            : undefined
                        }
                      />
                    )
                )}
              </>
            ) : activeButton === 'INTERVIEW' ? (
              <>
                {appsData.map(
                  (app, index) =>
                    (app.status === 'INTERVIEW' ||
                      app.status === 'ACCEPTED') && (
                      <ViewAllAppsCard
                        key={index}
                        firstName={app.firstName}
                        lastName={app.lastName}
                        email={app.email}
                        createdAt={app.createdAt}
                        interview={interview}
                        accept={
                          app.id && jobId
                            ? () =>
                                handleUpdateAppStatus(
                                  app.id as string,
                                  'ACCEPTED'
                                )
                            : undefined
                        }
                        reject={
                          app.id && jobId
                            ? () =>
                                handleUpdateAppStatus(
                                  app.id as string,
                                  'REJECTED'
                                )
                            : undefined
                        }
                        {...(app.status === 'ACCEPTED'
                          ? { accepted: true }
                          : {})}
                      />
                    )
                )}
              </>
            ) : (
              ''
            )}
          </CardsSection>
        )}
      </CardContainer>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  gap: 2.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  background-color: white;
  border-radius: 10px;
  padding: 24px 40px 24px 24px;
  overflow: visible;
  & > hr {
    width: 100%;
    position: relative;
    border: 0.5px solid #f8f8f8;
  }

  //mobile-specific styles
  @media (max-width: 768px) {
    padding: 1rem;
    gap: 0;
    align-items: center;

    & > hr {
      display: none;
    }
  }
`;

const Back = styled.div`
  font-size: 18px;
  font-weight: 500;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  color: #2f80ed;
  cursor: pointer;

  //mobile-specific styles
  @media (max-width: 768px) {
    background-color: ${({ theme }) => theme.palette.backgroundColor};
    font-size: 14px;
    width: 100%;
    justify-content: start;
    padding: 0.5rem;
    padding-bottom: 1rem;
    border-radius: 10px 10px 0 0;
    & > svg {
      height: 18px;
      width: 18px;
    }
  }
`;

const Header = styled.div`
  & > h3 {
    font-size: 32px;
    font-weight: 500;
    line-height: 47.84px;
    letter-spacing: -0.05em;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 1rem;
  }
  & > p {
    font-size: 16px;
    font-weight: 300;
    line-height: 23.92px;
    letter-spacing: -0.05em;
  }
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 220px;
    margin-top: 15px;
    & > span {
      display: flex;
      justify-content: start;
      align-items: center;
      gap: 5px;
      font-size: 14px;
      font-weight: 400;
      margin-right: 0.5rem;
      & > svg {
        width: 14px;
        height: 14px;
      }
    }
  }

  //mobile-specific styles
  @media (max-width: 768px) {
    background-color: ${({ theme }) => theme.palette.backgroundColor};
    padding: 0.3rem;
    width: 100%;

    & > h3 {
      font-size: 20px;
      font-weight: 500;
      line-height: 29.9px;
      letter-spacing: -0.05em;
    }

    & > p {
      font-size: 14px;
      font-weight: 300;
    }

    & > div {
      margin-top: 1rem;

      & > span {
        font-size: 13px;
        font-weight: 400;
      }
    }
  }
`;

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: start;
  & > div {
    width: 100%;
    display: flex;
    gap: 2rem;
    justify-content: start;
    align-items: center;
  }

  //mobile-specific styles
  @media (max-width: 768px) {
    border-radius: 0 0 10px 10px;
    padding: 1rem 1rem 2rem 1rem;
    background-color: ${({ theme }) => theme.palette.backgroundColor};

    & > div:nth-of-type(1) {
      justify-content: center;
      align-items: center;
      gap: 1rem;
    }
  }
`;

interface StyledButtonProps {
  isActive: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  width: 11rem;
  height: 2.5rem;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  color: ${({ isActive }) => (isActive ? '#2f80ed' : '#BDBDBD')};
  background-color: white;
  border: 1px solid ${({ isActive }) => (isActive ? '#2f80ed' : '#BDBDBD')};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    border-color: #2f80ed;
    color: #2f80ed;
  }
  &.edit {
    width: fit-content;
    height: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ isActive, disabled }) =>
      disabled ? '#BDBDBD' : isActive ? '#2f80ed' : '#BDBDBD'};
    border: none;
    display: flex;
    text-decoration: underline;
  }

  //mobile-specific styles
  @media (max-width: 768px) {
    border: none;
    background-color: inherit;
    color: ${({ isActive }) => (isActive ? '#000000' : '#BDBDBD')};

    &:hover {
      color: #000000;
    }
  }
`;

const CardsSection = styled.div`
  width: 100%;
  // height:28rem;
  max-width: 75rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: start;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  //  overflow: visible;

  //mobile-specific styles
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;
