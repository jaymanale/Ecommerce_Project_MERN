import { API } from './../../backend';

export const createCategoryAPI = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getAllCategoryAPI = (userId) => {
  return fetch(`${API}/categories/${userId}`, {
    method: 'GET',
  })
    .catch((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// Product calls

export const createProductAPI = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: 'POST',
    header: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getSingleProductAPI = (productId) => {
  return fetch(`${API}/${productId}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getAllProductAPI = () => {
  return fetch(`${API}/products`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateProductAPI = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: 'PUT',
    header: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteProductAPI = (productId, userId, token) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: 'DELETE',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
