import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
// import { QUERY_ARTICLES } from '../utils/queries';
import { LOGIN_USER } from '../utils/mutation'
import { Link } from 'react-router-dom';

import Auth from "../utils/auth";

const Login = () => {
    const [formState, setFormState] = useState({ email: "", password: "" });
    const [login, { error, data }] = useMutation(LOGIN_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await login({
                variables: { email: formState.email, password: formState.password }, 
            });

            Auth.login(data.login.token);
        } catch(error) {
            console.log(error);
        }

        setFormState({
            email: "",
            password: "",
        });
    }

    const handleChange = (event) => {
        // Destructuring the 'name' and 'value' properties from the event target
        const { name, value } = event.target;

        // Updating the form state using the spread operator to maintain the existing state
        // and only modify the property specified by 'name'
        setFormState({
            ...formState,
            [name]: value,
        });
    
    };


    return (
        <div className="login-page">
            {data ? (
                <p>
                    Success! You may now head{' '}
                    <Link to='/'>back to the homepage</Link>
                </p>
            ) : (
            <form className = 'login-form' onSubmit={handleFormSubmit}>
                <h2>Login</h2>
        
                <div>
                    <label>Email</label>
                    <input
                    placeholder='Your email'
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}/>      
                </div>
                <div>
                    <label>Password</label>
                    <input
                    placeholder='********'
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}/>           
                </div>
                <button>Sign In</button>
            </form>
            )}
            {error && (
                <p style={{ fontSize: '2.5rem', color: 'red'}}>
                    {error.message}!
                </p>
            )}
        </div>
        
    )
}

export default Login;