import DOMPurify from 'dompurify';
import React from 'react';

interface RichTextNormalDisplayProps {
  richTextContent: string; // This is the rich text string from the backend
}

const RichTextNormalDisplay: React.FC<RichTextNormalDisplayProps> = ({
  richTextContent,
}) => {
  // Sanitize the HTML content to prevent XSS attacks
  const sanitizedHTML = DOMPurify.sanitize(richTextContent);

  return (
    <div
      // Use dangerouslySetInnerHTML to inject the sanitized HTML
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  );
};

export default RichTextNormalDisplay;
