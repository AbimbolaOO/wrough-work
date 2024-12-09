import React from "react";

interface SearchIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const SearchIcon: React.FC<SearchIconProps> = ({
  width = 24,
  height = 24,
  color = "currentColor",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" />
      <line
        x1="16.5"
        y1="16.5"
        x2="21"
        y2="21"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default SearchIcon;
