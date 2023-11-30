import logo from './logo.svg';
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home'
import SingleArticle from './pages/SingleArticle';
import Login from './pages/Login'
import Signup from './pages/Signup';

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
    <BrowserRouter>
      <ApolloProvider client={client}>
        <div className="App">
          <Header/>
          <div>
            <Routes>
              <Route path ='/' element = {<Home/>}/>
              <Route path = '/articles/:articleId' element={<SingleArticle/>}/>
              <Route path = '/login' element = {<Login/>}/>
              <Route path = '/signup' element = {<Signup/>}/>
            </Routes>
          </div>
          <Footer/>
        </div> 
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
