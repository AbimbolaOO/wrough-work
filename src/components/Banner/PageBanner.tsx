import React from 'react';

import styled from '@emotion/styled';

interface PageBannerProps {
  label: string;
  description: string;
}

const PageBanner: React.FC<PageBannerProps> = ({ label, description }) => {
  return (
    <SettingsBanner>
      <div className='label'>{label}</div>
      <div className='description'>{description}</div>
    </SettingsBanner>
  );
};

export default PageBanner;

const SettingsBanner = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  margin-left: -54px;
  margin-right: -54px;
  padding: 18px 54px;

  & > .label {
    color: ${({ theme }) => theme.palette.blackBlackMain};
    font-weight: 600;
    font-size: 24px;
    line-height: 35.88px;
  }

  & > .description {
    color: ${({ theme }) => theme.palette.greyGrey1};
    font-weight: 400;
    font-size: 18px;
    line-height: 26px;
  }
`;
