import React, { useState } from 'react';
import Base from '../core/Base';
import { signup } from './../auth/helper/index';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
  });

  const { name, email, password } = values;

  const handleChange = (fieldName) => (event) => {
    setValues({ ...values, error: false, [fieldName]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            name: '',
            email: '',
            password: '',
            error: '',
            success: true,
          });
        }
      })
      .catch();
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form action="">
            <div className="form-group">
              <label className="text-dark"> Name</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange('name')}
              />
            </div>

            <div className="form-group">
              <label className="text-dark"> Email</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange('email')}
              />
            </div>
            <div className="form-group">
              <label className="text-dark"> Password</label>
              <input
                type="password"
                className="form-control"
                onChange={handleChange('password')}
              />
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
        <h1 className="display-3 mb-4"> Sign Up Page</h1>
        {signUpForm()}
      </div>
    </Base>
  );
};

export default Signup;
