import React from 'react';
import Base from './../core/Base';
import AdminMenu from './AdminMenu';

const manageProducts = () => {
  return (
    <Base>
      <div className="text-center">
        <h3>Manage a Product</h3>
        <p>Manage your Product here...</p>
      </div>
      <div className="row p-4">
        <div className="col-3">{AdminMenu()}</div>
        <div className="col-9"></div>
      </div>
    </Base>
  );
};

export default manageProducts;
