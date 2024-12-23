import React from 'react';

import styled from '@emotion/styled';

import RichTextNormalDisplay from '../../../../components/RichTextDisplay/RichTextNormalDisplay';

interface IJobInfoBody {
  jobDescription?: string;
}

const JobInfoBody: React.FC<IJobInfoBody> = ({ jobDescription }) => {
  return (
    <Container>
      <RichTextNormalDisplay
        richTextContent={jobDescription ? jobDescription : ''}
      />
    </Container>
  );
};

export default JobInfoBody;

const Container = styled.div``;
