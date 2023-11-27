import React, { useEffect } from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutation';
import Auth from '../../utils/auth';


const CommentForm = ({ articleId }) => {
    const [comment, setComment] = useState({ commentText: '', commentAuthor: ''});
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const profile = Auth.getProfile().data;
        setUserProfile(profile);
    }, []);

    const [addComment, { error }] = useMutation(ADD_COMMENT);

    const handleChange = (event) => {
        const { name, value } = event.target;
        // Updating the form state using the spread operator to maintain the existing state
        // and only modify the property specified by 'name'
        setComment({ ...comment, [name]: value });
    }

    const handleFormSubmit = async event => {
        event.preventDefault();
        try {
            const { data, error } = await addComment({
                variables: {
                    ...comment,
                    commentAuthor: userProfile.username,
                    articleId }
            });
            console.log(data, error);
            setComment({ commentText: '', comentAuthor: '' })
        } catch(e) {
            console.error(e);
        }
        window.location.reload(`/articles/${articleId}`)

    }
    return (

        <form className = 'comment-form' onSubmit={handleFormSubmit}>
            <label>Comments</label>
            <textarea 
                placeholder='Add comment here, not more than 280 characters'
                style={{width: 'inherit', height: 'inherit'}}
                value={comment.commentText}
                name="commentText"
                onChange={handleChange}>
                
            </textarea>
                            
            <button>Submit</button>
            {error && <span>Something went wrong...</span>}
        </form>
    )
}

export default CommentForm;