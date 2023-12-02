import React from 'react';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';

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
            <section className = "create-article">
                <h2 style={{fontSize: '1.7rem'}}>Write Article</h2>
                <form className = 'article-form'>
                    <div>
                        <label >Title</label>
                        <input style={{ width: '50vw'}}/>
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea
                        className = 'article-text'></textarea>
                    </div>
                    <button>Submit</button>

                </form>

            </section>
        </div>
    )
}

export default Dashboard