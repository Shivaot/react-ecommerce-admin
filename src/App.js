import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';  

import './App.css';
import * as actions from './store/actions/index';
import Navbar from './components/Navbar/Navbar';
import AuthPage from './pages/AuthPage/AuthPage';
import Logout from './pages/AuthPage/Logout/Logout';
import CustomerPage from './pages/CustomerPage/CustomerPage';
import SellerPage from './pages/SellerPage/SellerPage';
import ProductPage from './pages/ProductPage/ProductPage';
import AddCategoryPage from './pages/CategoryPage/AddCategoryPage';
import ViewCategories from './pages/CategoryPage/ViewCategories';
import UpdateCategory from './pages/CategoryPage/UpdateCategory';
import ViewMetadata from './pages/MetadataPage/ViewMetadata';
import AddMetadata from './pages/MetadataPage/AddMetadata';
import FieldValues from './pages/FieldValues/FieldValues';

function App(props) {
  const { onAutoSignIn } = props;
  
  useEffect(() => {  
    onAutoSignIn();
  }, [onAutoSignIn]);
  let routes = (
    <Switch>
      <Route exact path="/signin" component={AuthPage} />
      <Route exact path="/" component={AuthPage} />
      {/* <Redirect to="/" /> */}
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/customers" component={CustomerPage} />
        <Route exact path="/sellers" component={SellerPage} />
        <Route exact path="/products" component={ProductPage} />
        <Route exact path="/addCategory" component={AddCategoryPage} />
        <Route exact path="/categories" component={ViewCategories} />
        <Route exact path="/updateCategory/:id" component={UpdateCategory} />
        <Route exact path="/metadata" component={ViewMetadata} />
        <Route exact path="/addMetadata" component={AddMetadata} />
        <Route exact path="/fieldValues" component={FieldValues} />
        <Redirect to="/customers" />
    </Switch>
    );
  }
  return (
    <div className="App">
      <Navbar />
      {routes}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null, 
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignIn: () => dispatch(actions.authCheckState())
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(App);
