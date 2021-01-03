
// prevents user fro goint to these pages when logged in  

import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import checkLoggedIn from '../components/Auth/checkLoggedIn'

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                (!checkLoggedIn()) ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: { from: props.location }
                            }}
                        />
                    )
            }
        />
    )
}

export default AuthenticatedRoute
