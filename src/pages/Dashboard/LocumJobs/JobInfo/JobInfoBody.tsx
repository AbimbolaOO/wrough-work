import React from 'react';

import styled from '@emotion/styled';

import RichTextDisplay from '../../../../components/RichTextDisplay/RichTextDisplay';

interface IJobInfoBody {
  jobDescription?: string;
}

const JobInfoBody: React.FC<IJobInfoBody> = ({ jobDescription }) => {
  return (
    <Container>
      <RichTextDisplay richTextContent={jobDescription ? jobDescription : ''} />
    </Container>
  );
};

export default JobInfoBody;

const Container = styled.div`
  width: 100%;
`;
