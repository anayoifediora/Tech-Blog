import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutation';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

const Signup = () => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    })
    const [addUser, { error, data }] = useMutation(ADD_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addUser({
                variables: {
                    username: formState.username,
                    email: formState.email,
                    password: formState.password,
                }
            });

            Auth.login(data.addUser.token);
        } catch (e) {
            console.log(e)
        }

        setFormState({
            username: '',
            email: '',
            password: '',

        })
    }

    const handleChange = (event) => {
        // Destructuring the 'name' and 'value' properties from the event target
        const { name, value } = event.target;
        // Updating the form state using the spread operator to maintain the existing state
        // and only modify the property specified by 'name'
        setFormState({
            ...formState,
            [name]: value,
        })
        
    };

    return (
        <div className = 'signup-page'>
            {data ? (
                <p>
                    Success! You may now proceed to the{' '}
                    <Link to='/'>Home Page</Link>
                </p>
            ) : (
            <form className = 'signup-form' onSubmit={handleFormSubmit}>
                <h2>Signup</h2>
                <div>
                    <label>Username</label>
                    <input
                    placeholder='Your username'
                    name="username"
                    type="username"
                    value={formState.username}
                    onChange={handleChange}/>      
                </div>
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
                <button>Sign Up</button>
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

export default Signup;