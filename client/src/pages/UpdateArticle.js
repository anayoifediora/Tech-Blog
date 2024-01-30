import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { QUERY_SINGLE_ARTICLE } from '../utils/queries';

import { UPDATE_ARTICLE } from '../utils/mutation';

import Auth from '../utils/auth';

//This is the updae article page. It uses the UPDATE_ARTICLE mutation to update an article.
const UpdateForm = () => {
    const { articleId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_ARTICLE, {
        variables: { articleId: articleId },
    });
    console.log(data);

    const [article, setArticle] = useState({
        articleId: articleId,
        title: data?.article?.title || '',
        articleText: data?.article.articleText || '',
    });

    const [userProfile, setUserProfile] = useState(null);
    useEffect(() => {
        const profile = Auth.getProfile().data;
        setUserProfile(profile);
    }, []);

    const [updateArticle] = useMutation(UPDATE_ARTICLE);

    //This function handles the form submit event.
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if(!token) {
            return false;
        }

        try {
            const { data } = await updateArticle({
                variables: { ...article },
            });
            setArticle({
                title: data?.article?.title || '',
                articleText: data?.article?.articleText || ''
            });
        } catch (err) {
            console.error(err)
        }
        await window.location.assign(`/dashboard`);
        alert("Successfully updated article");
    }

    return (
        <div className = 'update-page'>
            {Auth.loggedIn() && userProfile ? (
                <>
                    <div className = 'update-form'>
                        <h2 style={{fontSize: '1.7rem'}}>Write Article</h2>
                            <form className = 'article-form' onSubmit={handleFormSubmit}>
                                <div>
                                    <label >Title</label>
                                    <input style={{ width: '50vw'}}
                                        value ={article.title}
                                        onChange={e => setArticle({...article, title: e.target.value})}
                                        name="title"/>
                                </div>
                                <div>
                                    <label>Description</label>
                                    <textarea
                                    className = 'article-text'
                                    name='articleText'
                                    placeholder="Write your article here...."
                                    value={article.articleText}
                                    onChange={e => setArticle({...article, articleText: e.target.value})}></textarea>
                                </div>
                                <button>Submit</button>

                            </form>
                    </div>
                </>
            ) : (

                <p>
                    You need to be logged in to share your articles. Please {' '}
                    <Link to='/login'>login</Link> or{' '}
                    <Link to='/signup'>signup</Link>
                </p>
            )}

        </div>

    )
}

export default UpdateForm;