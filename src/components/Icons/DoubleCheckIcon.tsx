import React from 'react';

const DoubleCheckIcon = () => {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
      {/* First checkmark */}
      <path d="M9 17L13 21L25 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Second checkmark */}
      <path d="M10 22L15 27L27 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default DoubleCheckIcon;
