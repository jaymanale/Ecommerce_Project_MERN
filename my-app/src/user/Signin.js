import React, { useState } from 'react';
import Base from '../core/Base';
import { Link, Redirect } from 'react-router-dom';
import { signin, isAuthenticated, authenticate } from '../auth/helper/index';

const Signin = () => {
  const [values, setValues] = useState({
    email: 't3@gmail.com',
    password: '12345',
    error: '',
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const onSubmit = (event) => {
    console.log('SUBMIT');
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        console.log('DATA:', data);
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            console.log('IN authenticate');
            setValues({
              ...values,
              email: '',
              password: '',
              error: '',
              loading: false,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log('Sign IN Catch Error'));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }

    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const handleChange = (inputField) => (event) => {
    setValues({ ...values, error: false, [inputField]: event.target.value });
  };
  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div style={{ display: error ? '' : 'none' }}>
        <p className="alert alert-danger">{error}</p>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form action="">
            <div className="form-group">
              <label className="text-dark"> Email</label>
              <input
                value={email}
                onChange={handleChange('email')}
                type="text"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="text-dark"> Password</label>
              <input
                value={password}
                onChange={handleChange('password')}
                type="password"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <button onClick={onSubmit} className="btn btn-primary btn-block">
                Submit
              </button>
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
        {loadingMessage()}
        {errorMessage()}
        {signInForm()}
        {performRedirect()}
        <p>{JSON.stringify(values)}</p>
      </div>
    </Base>
  );
};

export default Signin;
