import React from 'react';
import Menu from './Menu';
import Footer from './footer';
const Base = ({ children }) => {
  return (
    <React.Fragment>
      <Menu />
      <div> {children}</div>
      <Footer />
    </React.Fragment>
  );
};

export default Base;
