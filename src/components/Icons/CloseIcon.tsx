import React from "react";

interface CloseIconProps {
  onClick?: () => void;
}

const CloseIcon: React.FC<CloseIconProps> = ({ onClick }) => {
  return (
    <svg
      onClick={onClick}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="12" fill="black" />
      <path
        d="M16 8L8 16M8 8L16 16"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CloseIcon;
