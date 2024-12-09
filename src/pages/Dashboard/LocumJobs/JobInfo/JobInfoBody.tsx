import React from 'react';

import styled from '@emotion/styled';

import RichTextDisplay from '../../../../utils/RichTextDisplay';

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
  display: grid;
  gap: 1rem;
`;
