import React from 'react';
import { Route, Redirect } from "react-router-dom";

const AdminGuardedRoute = ({ component: Component, auth, ...rest }) => (
    <Route {...rest} render={(props) => (
        auth === true
            ? <Component {...props} />
            : <Redirect to='/unauthorized' />
    )} />
)

export default AdminGuardedRoute;