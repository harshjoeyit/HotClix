import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import './forms.css'

const Register = () => {
    const history = useHistory();

    const intiFormData = {
        username: '',
        email: '',
        password: '',
        password2: '',
    }
    const [formData, setFormData] = useState(intiFormData)
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(formData)

        if (formData.email === "" || formData.password === "" ||
            formData.username === "" || formData.password2 === "") {
            setError('Fill the form completely')
            return;
        }

        if (formData.password !== formData.password2) {
            setError('Passwords do not match')
            return;
        }

        const body = {
            username: formData.username,
            email: formData.email,
            password: formData.password
        }

        // MAKE REQUEST TO REGISTER ENDPOINT

        axios
            .post(`api/users/register`, body)
            .then(res => {
                // console.log(res.data)
                setError('')
                // REDIRECT TO SIGNIN
                setTimeout(() => {
                    history.push('/login');
                }, 500);
            })
            .catch(err => {
                const data = err.response.data;
                const error = data.message ? data.message : data.error
                // console.log(error)
                setError(error)
            })
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                {
                    (error.length > 0)
                        ? <div className="error">{error}</div>
                        : ''
                }
                <div className="input-container">
                    <input
                        type="text"
                        required
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                    />
                </div>
                <div className="input-container">
                    <input
                        type="email"
                        required
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                    />
                </div>
                <div className="input-container">
                    <input
                        type="password"
                        required
                        name="password"
                        placeholder='Password'
                        onChange={handleChange}
                    />
                </div>
                <div className="input-container">
                    <input
                        type="password"
                        required
                        name="password2"
                        placeholder='Repeat Password'
                        onChange={handleChange}
                    />
                </div>
                <div className="form-btn-container">
                    <button type="submit">Register</button>

                    <Link to="/login">
                        <button type="button" className="extralink" >Log In</button>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Register