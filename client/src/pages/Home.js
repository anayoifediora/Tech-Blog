import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ARTICLES } from '../utils/queries';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth'

const Home = () => {
    const  { loading, data } = useQuery(QUERY_ARTICLES);
    const [articles, setArticles] = useState([]);
    const [news, setNews] = useState([]);
    
    

    useEffect(() => {
        setArticles(data?.articles || []);
    }, [data]);

    useEffect(() => {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        
        let requestUrl = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=4b88cfe067334fcea64575c884088db9`
        // let requestUrl = `https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&from=${year}-${month}1-${day - 1}&to=${year}-${month}1-${day - 1}&apiKey=4b88cfe067334fcea64575c884088db9`
        
        fetch(requestUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(news) {
            setNews(news?.articles || [])
        })
        .catch(function(error) {
            console.log(error);
        });
    }, [])

    return (
        <>
            
            <h2 className="homepage-title">News and Articles</h2>
            {loading ? 
                ( <div>Loading...</div>) : 
        
                (   
                <div className="home">
                    <div className = 'articles-container'>
        
                        {                        
                        articles.map((article, index) => (
                            <div className='article-card' key={index}>
                                {/* <img className= "home-image" src={article.image} alt=""/> */}
                                <img className= "home-image" src={article.image.split('fakepath').pop()} alt=""/>
                                <Link className="article-title" to = {`/articles/${article._id}`}><h3 style={{ height: '30px', marginTop: '5px' }}>{article.title}</h3></Link>
                                <h5 className = "article-author">{article.articleAuthor} on <span>{article.createdAt}</span></h5>
                                <h4 className = "comment-count">Comments: {article.commentCount} <span>Likes: {article.likeCount}</span></h4>
                                
                            </div>
                        ))}              
                    </div>
                    <div className="news">
                        <h2 style={{textDecoration: "underline", fontFamily: 'Fredericka the Great  serif'}}>Other News</h2>
                        {
                        news.map((article, index) => (
                            <div className='news-card' key={index}>
                                <img className= "news-image" src={article.urlToImage} alt=""/>
                                <Link className="news-title" to = {article.url} target="_blank"><h3 style={{ height: '30px', marginTop: '5px' }}>{article.title}</h3></Link>
                                <h5 className = "news-author">{article.author} on <span>{article.publishedAt.split('T').shift()}</span></h5>
                                
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