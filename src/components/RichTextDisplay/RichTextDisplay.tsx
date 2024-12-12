import React from "react";
import DOMPurify from "dompurify";

interface RichTextDisplayProps {
  richTextContent: string; // This is the rich text string from the backend
}

const RichTextDisplay: React.FC<RichTextDisplayProps> = ({
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

export default RichTextDisplay;
