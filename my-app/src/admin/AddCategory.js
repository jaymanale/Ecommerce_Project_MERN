import React, { useState } from 'react';
import Base from './../core/Base';
import AdminMenu from './AdminMenu';
import { isAuthenticated } from './../auth/helper/index';
import { createCategoryAPI } from './helper/adminapicall';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (event) => {
    setError(false);
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError('');
    setSuccess(true);

    // backend call
    createCategoryAPI(user._id, token, { name })
      .then((data) => {
        if (data.error) {
          setError(true);
          setSuccess(false);
        } else {
          setError('');
          setSuccess(true);
        }
        setName('');
      })
      .catch((err) => console.log('ERR : in Backend CALL'));
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success"> Category created SUccessfully</h4>;
    }
  };

  const errorMessage = () => {
    if (error) {
      return <h4 className="text-danger"> Category creation Failed </h4>;
    }
  };

  const createCategory = () => {
    return (
      <form>
        <div className="card">
          <div className="card-body">
            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                onChange={handleChange}
                value={name}
                className="form-control"
                aria-describedby="category"
                placeholder="For Ex. Summer"
              />
            </div>
            <button
              onClick={onSubmit}
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    );
  };

  return (
    <Base>
      <div className="text-center">
        <h3>Create a Category</h3>
        <p>Manage your Category here...</p>
      </div>
      <div className="row p-4">
        <div className="col-3">{AdminMenu()}</div>
        <div className="col-9">
          {successMessage()}
          {errorMessage()}
          {createCategory()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
