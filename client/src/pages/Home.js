import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ARTICLES } from '../utils/queries';


const Home = () => {
    const  { loading, data } = useQuery(QUERY_ARTICLES);
    const [articles, setArticles] = useState([]);
    
    useEffect(() => {
        setArticles(data?.articles || []);
        console.log(data)
    }, [data]);

    return (
        <>
            <h3>Latest News</h3>
            {loading ? 
            ( <div>Loading...</div>) : 
            ( 
                articles.map((article, index) => (
                    <div className='article-card' key={index}>
                        <h4>Written by: {article.articleAuthor} on <span>{article.createdAt}</span></h4>
                        <img src={article.image}/>
                        <h3>{article.title}</h3>
                        <h5>Comments: {article.commentCount}</h5>


                    </div>
                ))

            )} 
        </>
    )
}

export default Home