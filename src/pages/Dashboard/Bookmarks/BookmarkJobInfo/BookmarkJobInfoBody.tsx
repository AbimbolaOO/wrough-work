import React from 'react';

import styled from '@emotion/styled';

import RichTextDisplay from '../../../../components/RichTextDisplay/RichTextDisplay';

interface IBookmarkJobInfoBody {
  jobDescription?: string;
}

const BookmarkJobInfoBody: React.FC<IBookmarkJobInfoBody> = ({
  jobDescription,
}) => {
  return (
    <Container>
      <RichTextDisplay richTextContent={jobDescription ? jobDescription : ''} />
    </Container>
  );
};

export default BookmarkJobInfoBody;

const Container = styled.div``;
