import React from 'react';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';

import ArticleForm from '../components/ArticleForm'
import { QUERY_MY_ARTICLES } from '../utils/queries';
import { REMOVE_ARTICLE } from '../utils/mutation';
import Auth from '../utils/auth';

const Dashboard = () => {

    const { loading, data } = useQuery(QUERY_MY_ARTICLES, {
        variables: { email: Auth.getProfile().data.email },
    });
    const articles = data?.user?.articles || [];
    console.log(articles)

    const [removeArticle, ] = useMutation(REMOVE_ARTICLE);

    //This function handles the delete article event.
    const handleDeleteArticle = async (articleId) => {
        
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if(!token) {
            return false;
        }
        try {
            const { data } = await removeArticle({
                variables: { articleId: articleId }
            })
        } catch (err) {
            console.error(err)
        }
        //reload the page after deleting an article
        window.location.reload('/dashboard');
    } 

    return (
        <div className = 'dashboard'>
            {Auth.loggedIn() ? (
            <>
                <section className = 'user-articles-section'>
                    <h2 style={{fontSize: '1.7rem'}}>{`${Auth.getProfile().data.username}'s Articles`}</h2>
                    {articles.map((article) => 
                        <div key={article._id} className= 'user-article'>
                            <Link to ={`/articles/${article._id}`}><p>{article.title}</p></Link>
                            <div>
                                <Link to={`/update/${article._id}`}><button>Update</button></Link>
                                <button onClick={() => handleDeleteArticle(article._id)}>Delete</button>
                            </div>
                        </div>
                    )}
                </section>
                <ArticleForm/>
            </>
                ) : (
                    <h4>
                        Kindly login to view this article
                    </h4>
                )}
            
        </div>
    )
}

export default Dashboard