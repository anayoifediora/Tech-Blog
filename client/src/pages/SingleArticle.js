import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_SINGLE_ARTICLE } from '../utils/queries';

import Auth from '../utils/auth';

// SingleArticle is a component that displays a single article and its comments
const SingleArticle = () => {
    const { articleId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_ARTICLE, {
        variables: { articleId: articleId },
    });

    const article = data?.article || {};
    if (loading) {
        return <div>Loading....</div>;
    }
    console.log(article)
    const { title, _id, articleAuthor, articleText, createdAt, image, likes, comments, commentCount, likeCount } = article
    return (
        <div>
            {Auth.loggedIn() ? (

                <div className="fullArticle-page">
                    <div className= "fullArticle-container">
                        <h2 className="fullArticle-title">{title}</h2>
                        <img className="fullArticle-img" src={image} alt=''/>
                        <p className="fullArticle-author"> Written by {articleAuthor} on <span>{createdAt}</span></p>
                        <p className="fullArticle-text">{articleText}</p>
                    </div>

                </div>
                
            ) : (
                <h4>
                    Kindly login to view this article
                </h4>
            )}
        </div>
    )
}

export default SingleArticle