import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ARTICLES } from '../utils/queries';
import { Link } from 'react-router-dom';


const Home = () => {
    const  { loading, data } = useQuery(QUERY_ARTICLES);
    const [articles, setArticles] = useState([]);
    
    

    useEffect(() => {
        setArticles(data?.articles || []);
        console.log(data)
    }, [data]);


    return (
        <>
        
            <h2 className="homepage-title">Latest News</h2>
            <button>Return to home</button>
            {loading ? 
                ( <div>Loading...</div>) : 
        
                (   <div className = 'articles-container'>{
                        articles.map((article, index) => (
                            <div className='article-card' key={index}>
                                <Link className="article-title" to = {`/articles/${article._id}`}><h3 style={{ height: '50px'}}>{article.title}</h3></Link>
                                <img className= "home-image" src={article.image} alt=""/>
                                <h5 className = "article-author">By: {article.articleAuthor} on <span>{article.createdAt}</span></h5>
                                <h5>Comments: {article.commentCount} <span>Likes: {article.likeCount}</span></h5>
                                {console.log(article.image)}
                            </div>
                        ))}
                    </div>
                )
            } 
        </>
    )
}

export default Home