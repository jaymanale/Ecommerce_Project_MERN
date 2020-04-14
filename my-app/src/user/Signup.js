import React, { useState } from 'react';
import Base from '../core/Base';
import { signup } from '../auth/helper/index';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
  });

  const { name, email, password, success, error } = values;

  const handleChange = (fieldName) => (event) => {
    setValues({ ...values, error: false, [fieldName]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        console.log('data:', data.error);
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            success: false,
          });
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
      <form>
        <div className="form-group">
          <label className="text-dark"> Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={handleChange('name')}
          />
        </div>

        <div className="form-group">
          <label className="text-dark"> Email</label>
          <input
            type="text"
            className="form-control"
            value={email}
            onChange={handleChange('email')}
          />
        </div>
        <div className="form-group">
          <label className="text-dark"> Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={handleChange('password')}
          />
        </div>
        <div className="form-group">
          <button onClick={onSubmit} className="btn btn-primary btn-block">
            Submit
          </button>
        </div>
      </form>
    );
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: success ? '' : 'none' }}
      >
        Account created successfully, Please{' '}
        <Link to="/signin"> login here </Link>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error.length ? '' : 'none' }}
      >
        Error in sign up
      </div>
    );
  };

  return (
    <Base>
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <h4 className="display-4 mb-4 text-center mt-3"> Sign Up here</h4>
          {successMessage()}
          {errorMessage()}
          {signUpForm()}
          <p>{JSON.stringify(values)}</p>
        </div>
      </div>
    </Base>
  );
};

export default Signup;
