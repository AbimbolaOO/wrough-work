import DOMPurify from 'dompurify';
import React from 'react';

import styled from '@emotion/styled';

interface RichTextDisplayProps {
  richTextContent: string; // This is the rich text string from the backend
}

const RichTextDisplay: React.FC<RichTextDisplayProps> = ({
  richTextContent,
}) => {
  // Sanitize the HTML content to prevent XSS attacks
  const sanitizedHTML = DOMPurify.sanitize(richTextContent);

  return (
    <Container
      // Use dangerouslySetInnerHTML to inject the sanitized HTML
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  );
};

export default RichTextDisplay;

const Container = styled.div`
  display: flex;

  &,
  & > *,
  & > * > *,
  & > * > * > *,
  & > * > * > * > * {
    font-weight: 300;
    font-size: 16px;
    line-height: 24px;
    color: ${({ theme }) => theme.palette.blackBlack3};
    background-color: transparent !important;
  }

  span {
    font-weight: inherit !important;
    font-size: inherit !important;
    line-height: inherit !important;
    color: inherit !important;
    background-color: inherit !important;
  }
`;
