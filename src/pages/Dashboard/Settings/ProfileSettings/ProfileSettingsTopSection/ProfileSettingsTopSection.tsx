import React, { useState } from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import { FormComponent } from '../../../../../components/Form/FormComponent';
import { InputWrapper } from '../../../../../components/Form/FormField';
import ImageUploadButton from '../../../../../components/Form/ImageUploadButton';
import useUploadProfileImage from '../../../../../hooks/dashboard/settings/profilesetting/useUploadProfileImage';
import {
  ProfileImageDataType,
  ProfileImageSchema,
  profileImageValues,
} from '../../../../../models/dashboard/settings/profileSettings/profileImage.model';
import { useAppSelector } from '../../../../../redux/store';
import { DEFAULT_IMAGE_URL } from '../../../../../utils/utils';

const ProfileSettingsTopSection = () => {
  const { authData } = useAppSelector((state) => state.auth);
  const { uploadProfileImage, loading } = useUploadProfileImage();
  const [defaultImgUrl, setDefaultImgUrl] = useState<string | null>(
    authData?.profileImage ?? DEFAULT_IMAGE_URL
  );

  const handleSubmit = (values: ProfileImageDataType) => {
    console.log('LOL');
    uploadProfileImage(values);
  };

  return (
    <Container>
      <FormComponent
        initialValues={profileImageValues}
        schema={ProfileImageSchema}
        onSubmit={handleSubmit}
      >
        <InputWrapper>
          <InputContainer>
            <ImageContainer>
              {loading && (
                <div className='loadingIcon'>
                  <LoadingOutlined />
                </div>
              )}
              <Img src={`${defaultImgUrl}`} alt='profile image' />
            </ImageContainer>
            <TextArea>
              <div className='name'>{`${authData?.lastName} ${authData?.firstName}`}</div>
              <div className='email'>{authData?.email}</div>

              <ImageUploadButton
                id='profileImage'
                name='profileImage'
                defaultImgUrl={defaultImgUrl}
                setDefaultImgUrl={setDefaultImgUrl}
              />
            </TextArea>
          </InputContainer>
        </InputWrapper>
      </FormComponent>
    </Container>
  );
};

export default ProfileSettingsTopSection;

const Container = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  padding: 1.25rem;

  @media (max-width: 884px) {
    /* border: 1px solid blue; */
    gap: 16px;
  }
`;

export const InputContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 32px;
  align-items: center;

  @media (max-width: 884px) {
    /* display: flex; */
    gap: 16px;
  }
`;

const ImageContainer = styled.div`
  display: grid;
  place-content: center;
  width: 150px;
  height: 150px;
  border-radius: 4px;
  overflow: hidden;
  /* border: 1px solid red; */

  & > * {
    grid-column: 1;
    grid-row: 1;
    border-radius: 4px;
  }

  & > .loadingIcon {
    /* border: 2px solid red; */
    display: grid;
    place-content: center;
    color: ${({ theme }) => theme.palette.mainBlue};
  }

  /*  */
  @media (max-width: 624px) {
    width: 50px;
    height: 50px;
  }
`;

const Img = styled.img`
  object-fit: fill;
  object-position: center center;
`;

const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid red; */
  width: 100%;
  word-break: break-word;

  & > .name {
    font-weight: 500;
    font-size: 24px;
    line-height: 35.88px;
    color: ${({ theme }) => theme.palette.blackBlackMain};
  }

  & > .email {
    font-weight: 300;
    font-size: 18px;
    line-height: 26.91px;
    color: ${({ theme }) => theme.palette.greyGrey1};
  }

  & > :last-of-type {
    margin-top: 10px;
  }

  @media (max-width: 624px) {
    & > .name {
      font-size: 18px;
      line-height: 26px;
      color: ${({ theme }) => theme.palette.blackBlackMain};
    }

    & > .email {
      font-size: 14px;
      line-height: 20px;
    }

    & > :last-of-type {
      margin-top: 10px;
    }
  }
`;
