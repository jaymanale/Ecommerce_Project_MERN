import React from 'react';
import Menu from './Menu';

const Base = ({ children }) => {
  return (
    <div>
      <Menu />
      <div> {children}</div>
      <footer>
        <div className="row">
          <div className="col-6">this le left footer</div>
          <div className="col-6">this is right footer</div>
        </div>
      </footer>
    </div>
  );
};

export default Base;
