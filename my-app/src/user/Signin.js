import React, { useState } from 'react';
import Base from '../core/Base';

const Signin = () => {
  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form action="">
            <div className="form-group">
              <label className="text-dark"> Email</label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label className="text-dark"> Password</label>
              <input type="password" className="form-control" />
            </div>

            <div className="form-group">
              <button className="btn btn-primary btn-block">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base>
      <div className="container text-center mt-5">
        <h1 className="display-3 mb-4"> Sign In Page</h1>
        {signInForm()}
      </div>
    </Base>
  );
};

export default Signin;
