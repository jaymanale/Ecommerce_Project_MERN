import React from 'react';
import Base from './../core/Base';
import AdminMenu from './AdminMenu';
const manageCategories = () => {
  return (
    <Base>
      <div className="text-center">
        <h3>Manage a Category</h3>
        <p>Manage your Category here...</p>
      </div>
      <div className="row p-4">
        <div className="col-3">{AdminMenu()}</div>
        <div className="col-9"></div>
      </div>
    </Base>
  );
};

export default manageCategories;
