import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useSelector} from 'react-redux'





const PrivateRouteDelivery = ({ component: Component, auth, ...rest }) => {
    const state = useSelector((state)=>state)
    let isAuthenticated = (state.isAuthenticated && state.user.role === 'deliveryperson')?true:false;
  return (
    <Route
    {...rest}
    render={props =>
      isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
  )
}


export default PrivateRouteDelivery;
