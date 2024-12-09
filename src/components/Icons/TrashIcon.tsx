import React from 'react';

const TrashIcon = () => {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Trash can body with rounded corners */}
      <rect x="10" y="10" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
      {/* Trash lid with rounded corners */}
      <rect x="9" y="7" width="16" height="3" rx="1.5" stroke="currentColor" strokeWidth="2" fill="none" />
      {/* Handle */}
      <path d="M13 7V6C13 4.9 13.9 4 15 4H19C20.1 4 21 4.9 21 6V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Trash bin lines */}
      <path d="M14 14V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 14V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

export default TrashIcon;
