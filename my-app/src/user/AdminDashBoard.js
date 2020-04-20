import React from 'react';
import { Link } from 'react-router-dom';
import Base from '../core/Base';
import { isAuthenticated } from './../auth/helper/index';
import AdminMenu from './../admin/AdminMenu';

const AdminDashBoard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">Admin Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Name:</span> {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email:</span> {email}
          </li>

          <li className="list-group-item">
            <span className="badge badge-danger">Admin Area</span>
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Base>
      <div className="text-center">
        <h3>Welcome to Admin Panel</h3>
        <p>Manage your product here...</p>
      </div>

      <div className="row p-4">
        <div className="col-3">{AdminMenu()}</div>
        <div className="col-9"> {adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
