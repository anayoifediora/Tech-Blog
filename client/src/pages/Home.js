import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ARTICLES } from '../utils/queries';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth'

const Home = () => {
    const  { loading, data } = useQuery(QUERY_ARTICLES);
    const [articles, setArticles] = useState([]);
    const [news, setNews] = useState([]);
    
    // const userProfile = Auth.getProfile().data;


    useEffect(() => {
        setArticles(data?.articles || []);
        console.log(data)
    }, [data]);

    useEffect(() => {
        
        let requestUrl = "https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&from=2024-01-11&to=2024-01-11&apiKey=4b88cfe067334fcea64575c884088db9"
        
        fetch(requestUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(news) {
            setNews(news?.articles || [])
            console.log(news)
        })
        .catch(function(error) {
            console.log(error);
        });
    }, [])

    return (
        <>
            {/* <h5 className = 'username'>Logged in as {userProfile.username}</h5> */}
            <h2 className="homepage-title">Latest News</h2>
            {loading ? 
                ( <div>Loading...</div>) : 
        
                (   
                <div className="home">
                    <div className = 'articles-container'>{
                        articles.map((article, index) => (
                            <div className='article-card' key={index}>
                                {/* <Link className="article-title" to = {`/articles/${article._id}`}><h3 style={{ height: '50px', margin: '15px' }}>{article.title}</h3></Link> */}
                                <img className= "home-image" src={article.image} alt=""/>
                                <Link className="article-title" to = {`/articles/${article._id}`}><h3 style={{ height: '30px', marginTop: '5px' }}>{article.title}</h3></Link>
                                <h5 className = "article-author">{article.articleAuthor} on <span>{article.createdAt}</span></h5>
                                <h4 className = "comment-count">Comments: {article.commentCount} <span>Likes: {article.likeCount}</span></h4>
                                
                            </div>
                        ))}              
                    </div>
                    <div className="news">
                        {
                        news.map((article, index) => (
                            <div className='news-card' key={index}>
                                {/* <Link className="article-title" to = {`/articles/${article._id}`}><h3 style={{ height: '50px', margin: '15px' }}>{article.title}</h3></Link> */}
                                <img className= "home-image" src={article.urlToImage} alt=""/>
                                <Link className="article-title" to = {article.url}><h3 style={{ height: '30px', marginTop: '5px' }}>{article.title}</h3></Link>
                                <h5 className = "article-author">{article.author} on <span>{article.publishedAt}</span></h5>
                                
                            </div>
                        ))}
                    </div>
                </div>
                )
            } 
        </>
    )
}

export default Home