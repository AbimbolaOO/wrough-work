import React, { useRef, useState } from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import { PrimaryButton } from '../../../../../components/Button';
import Img from '../../../../../components/Img/Img';
import useGetUserData from '../../../../../hooks/getData/useGetUserData';
import usePutUserProfilePic from '../../../../../hooks/putData/usePutUserProfilePic';

const ProfileSettingsTopSection = () => {
  const { userData } = useGetUserData();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { putProfilePic } = usePutUserProfilePic();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSaveClick = () => {
    if (selectedFile) {
      putProfilePic({ profileImage: selectedFile });
    }
  };

  return (
    <Container>
      <StyledImg>
        <Img
          src={
            previewUrl ||
            userData?.profileImage ||
            '/static/img/profilePlaceHolder.png'
          }
          alt='profileImg'
        />
      </StyledImg>
      <ProfileTopSectionTextArea>
        <h2>
          {userData ? (
            `${userData.firstName} ${userData.lastName}`
          ) : (
            <LoadingOutlined />
          )}
        </h2>
        <p>{userData ? `${userData.email}` : <LoadingOutlined />}</p>
        <Wrapper>
          <PrimaryButton
            className='grey contentFit nowrap respondsmall'
            click={handleUploadClick}
          >
            Upload Profile Picture
          </PrimaryButton>
          <FileInput
            type='file'
            accept='image/*'
            ref={fileInputRef}
            onChange={handleFileSelect}
          />
          {selectedFile && (
            <PrimaryButton
              className='grey contentFit respondsmall'
              click={handleSaveClick}
            >
              Save
            </PrimaryButton>
          )}
        </Wrapper>
      </ProfileTopSectionTextArea>
    </Container>
  );
};

export default ProfileSettingsTopSection;

// Styled Components

const Container = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  padding: 1.25rem;

  //mobile-specific styles
  @media (max-width: 768px) {
    gap: 0.5rem;
    padding: 1rem;
  }
`;

const ProfileTopSectionTextArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & > h2 {
    font-size: 1.5rem;
    font-weight: 500;
  }

  //mobile-specific styles
  @media (max-width: 768px) {
    width: auto;
    flex-grow: 1;
    gap: 0;

    & > h2 {
      font-size: 16px;
    }

    & > p {
      font-size: 14px;
    }
  }
`;

const FileInput = styled.input`
  display: none;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 5px;
`;
const StyledImg = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  & > img {
    width: 100%;
    height: auto;
    object-size: contain;
  }

  //mobile-specific styles
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;
