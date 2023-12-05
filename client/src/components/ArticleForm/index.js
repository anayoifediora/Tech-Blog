import React from 'react';
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import Auth from '../../utils/auth';
import { ADD_ARTICLE } from '../../utils/mutation';

const ArticleForm = () => {
    const [article, setArticle] = useState({ articleText: '', title: '', image: '' });
    const [userProfile, setUserProfile] = useState(null);
    useEffect(() => {
        const profile = Auth.getProfile().data;
        setUserProfile(profile);
    }, [])

    const [addArticle, { error }] = useMutation(ADD_ARTICLE);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data, error } = await addArticle({
                variables: {
                    ...article,
                    articleAuthor: userProfile.username,
                }
            });
            console.log(data, error);
            setArticle({ articleText: '', title: '', image: '' });
        } catch (err) {
            console.error(err);
        }
        window.location.reload('/dashboard');
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setArticle({...article, [name]: value})
    }

    return (

        <section className = "create-article">
                <h2 style={{fontSize: '1.7rem'}}>Write Article</h2>
                <form className = 'article-form' onSubmit={handleFormSubmit}>
                    <div>
                        <label >Title</label>
                        <input style={{ width: '50vw'}}
                               value ={article.title}
                               onChange={handleChange}
                               name="title"/>
                    </div>
                    <div>
                        <input type="file"
                               value={article.image}
                               onChange={handleChange}
                               name='image'/>
                        {/* <button>Upload</button> */}
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea
                        className = 'article-text'
                        name='articleText'
                        placeholder="Write your article here...."
                        value={article.articleText}
                        onChange={handleChange}></textarea>
                    </div>
                    <button>Submit</button>

                </form>

            </section>
    )
}

export default ArticleForm