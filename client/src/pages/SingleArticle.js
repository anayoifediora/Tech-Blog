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
    let { title, _id, articleAuthor, articleText, createdAt, 
           image, likes, comments, commentCount, likeCount 
          } = article

    const iconStyle = {
        fontSize:'1.7rem', 
        margin: '10px'
    }

    const iconTextStyle = {
        marginLeft: '8px', 
        fontStyle:'normal'
    }

    return (
        <div>
            {Auth.loggedIn() ? (

                <div className="fullArticle-page">
                    <div className= "fullArticle-container">
                        <h2 className="fullArticle-title">{title}</h2>
                        <p className="fullArticle-author"> Written by {articleAuthor} on  <span>{createdAt}</span></p>
                        <img className="fullArticle-img" src={image} alt=''/>
                        <div style={{marginTop: '15px', position:'relative', right: '400px'}}>
                            <i className = "bi bi-chat-left" style={iconStyle}><span style={iconTextStyle}>{commentCount}</span></i>
                            <i className = "bi bi-hand-thumbs-up" style={iconStyle}><span style={iconTextStyle}>{likeCount}</span></i>
                        </div>
                        <p className="fullArticle-text">{articleText}</p>
                    </div>
                    <div>
                        
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