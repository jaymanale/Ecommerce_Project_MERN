import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import PrivateRoute from './auth/helper/PrivateRoutes';
import UserDashBoard from './user/UserDashBoard';
import AdminDashBoard from './user/AdminDashBoard';
import AdminRoute from './auth/helper/AdminRoutes';
import AddCategory from './admin/AddCategory';
import manageCategories from './admin/ManageCategories';
import addProduct from './admin/AddProduct';
import manageProducts from './admin/ManageProducts';
import manageOrder from './admin/Orders';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/signup" exact component={Signup}></Route>
        <Route path="/signin" exact component={Signin}></Route>
        <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
        <AdminRoute
          path="/admin/create/category"
          exact
          component={AddCategory}
        />
        <AdminRoute
          path="/admin/categories"
          exact
          component={manageCategories}
        />
        <AdminRoute path="/admin/create/product" exact component={addProduct} />
        <AdminRoute path="/admin/products" exact component={manageProducts} />
        <AdminRoute path="/admin/orders" exact component={manageOrder} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
