import React from 'react';
import { Helmet } from 'react-helmet-async';

const Page: React.FC<IPage> = ({ children, title }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </>
  );
};

export default Page;

// === interfaces
interface IPage {
  title: string;
  children: React.ReactNode;
}
