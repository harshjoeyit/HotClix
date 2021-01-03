
import React from 'react'
import { useHistory } from 'react-router-dom';
import checkLoggedIn from './checkLoggedIn';

const Logout = () => {
    const history = useHistory()

    // if user is not logged in and tries to logout rect
	if(!checkLoggedIn() ||  !window.confirm('Are your sure to logout')) {
		history.goBack();	
		return <></>;
    }
    
    localStorage.removeItem('auth_token')
    history.push('/login');
	window.location.reload();

    return null
}

export default Logout
