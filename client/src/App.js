import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import './App.css';
import Header from './components/Header';
import Home from './pages/Home'

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


// This function is the main function that renders the entire application. 


function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header/>
        
        <Home/>
        
      </div> 
    </ApolloProvider>
  );
}

export default App;
