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
              <div className='name'>Abimbola Olayemi</div>
              <div className='email'>abimbolaolayemiwhyte@gmail.com</div>

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
`;

export const InputContainer = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;
`;

const ImageContainer = styled.div`
  display: grid;
  place-content: center;
  width: 150px;
  height: 150px;
  border-radius: 4px;
  overflow: hidden;

  & > * {
    grid-column: 1;
    grid-row: 1;
    border-radius: 4px;
  }

  & > .loadingIcon {
    border: 2px solid red;
    display: grid;
    place-content: center;
    color: ${({ theme }) => theme.palette.mainBlue};
  }
`;

const Img = styled.img`
  object-fit: fill;
  object-position: center center;
`;

const TextArea = styled.div`
  display: flex;
  flex-direction: column;

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
`;
