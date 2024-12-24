import React from 'react';

import styled from '@emotion/styled';

import RichTextNormalDisplay from '../../../../components/RichTextDisplay/RichTextNormalDisplay';

interface IBookmarkJobInfoBody {
  jobDescription?: string;
}

const BookmarkJobInfoBody: React.FC<IBookmarkJobInfoBody> = ({
  jobDescription,
}) => {
  return (
    <Container>
      <RichTextNormalDisplay
        richTextContent={jobDescription ? jobDescription : ''}
      />
    </Container>
  );
};

export default BookmarkJobInfoBody;

const Container = styled.div``;
