import React from 'react';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';

import ArticleForm from '../components/ArticleForm'
import { QUERY_MY_ARTICLES } from '../utils/queries';
import Auth from '../utils/auth';

const Dashboard = () => {

    const { loading, data } = useQuery(QUERY_MY_ARTICLES, {
        variables: { email: Auth.getProfile().data.email },
    });
    const articles = data?.user?.articles || [];
    console.log(articles)

    return (
        <div className = 'dashboard'>
            <section className = 'user-articles-section'>
                <h2 style={{fontSize: '1.7rem'}}>{`${Auth.getProfile().data.username}'s Articles`}</h2>
                {articles.map((article) => 
                    <div key={article._id} className= 'user-article'>
                        <Link to ={`/articles/${article._id}`}><p>{article.title}</p></Link>
                        <div>
                            <button>Update</button>
                            <button>Delete</button>
                        </div>
                    </div>
                )}
            </section>
            <ArticleForm/>
            
        </div>
    )
}

export default Dashboard