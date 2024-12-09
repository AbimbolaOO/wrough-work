import React from 'react';

interface IImg {
  src: string;
  alt?: string;
}
const Img: React.FC<IImg> = ({ src, alt }) => {
  return <img loading="lazy" src={src} alt={alt} decoding="async" />;
};

export default Img;
