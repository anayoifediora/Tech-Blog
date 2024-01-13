import React, { useEffect } from 'react';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { QUERY_SINGLE_ARTICLE } from '../utils/queries';
import { useMutation } from '@apollo/client';
import { ADD_LIKE } from '../utils/mutation';


import Auth from '../utils/auth';
import CommentForm from '../components/CommentForm';


// SingleArticle is a component that displays a single article and its comments
const SingleArticle = () => {
    const [like, setLike] = useState({ likeAuthor: '', articleId: '' });
    // const [userProfile, setUserProfile] = useState(null);

    // useEffect(() => {
    //     const profile = Auth.getProfile().data;
    //     setUserProfile(profile);
    //     console.log(profile)
    // }, []);

    const [addLike, { error }] = useMutation(ADD_LIKE);

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

    const handleLike = async (event) => {
        const userProfile = Auth.getProfile().data;
        try {
            const { data, error } = await addLike({
                variables: {
                    ...like,
                    likeAuthor: userProfile.username,
                    articleId
                }
            }); 
            console.log(data, error);
            setLike(like)
        } catch(e) {
            console.error(e)
        }
        window.location.reload(`/articles/${articleId}`)
    }
    const iconStyle = {
        fontSize:'1.7rem', 
        margin: '10px'
    }

    const iconTextStyle = {
        marginLeft: '8px', 
        fontStyle:'normal'
    }
    const displayCommentField = () => {
        const commentFormStyle = `
            display:flex;
            flex-direction: column;
            align-items: center;
            margin: 10px;
            padding: 10px;
            background-color: var(--ghost-white);
            width: 35vw;
            height: 25vh;
            border: solid 1.1px var(--paynes-gray);`
        
        const commentForm = document.getElementById('comment-form');
        commentForm.setAttribute('style', commentFormStyle);
    }
    console.log(articleText)
    
    return (
        <div>
            {Auth.loggedIn() ? (
                <>
                    <div className="fullArticle-page">
                        <div className= "fullArticle-container">
                            
                            <h2 className="fullArticle-title">{title}</h2>
                            <p className="fullArticle-author"> Written by {articleAuthor} on  <span>{createdAt}</span></p>
                            <img className="fullArticle-img" src={image} alt=''/>
                            <div style={{marginTop: '15px', position:'relative', right: '400px'}}>
                                <i className = "bi bi-chat-left" style={iconStyle}><span style={iconTextStyle}>{commentCount}</span></i>
                                <i className = "bi bi-hand-thumbs-up" style={iconStyle}><span style={iconTextStyle}>{likeCount}</span></i>
                            </div>
                            {/* <p>liked by</p>
                            {likes.map((like) => (
                                <p key={like._id}>{like.likeAuthor}</p>
                            ))} */}
                            <p className="fullArticle-text">{articleText}</p>
            
                        </div>
                        <div>
                        <button className='comment-btn' onClick={displayCommentField}>Comment</button>
                            <button className = 'comment-btn' onClick={handleLike}>Like</button>
                        </div>
                        <div className="comment-section">
                            
                            <CommentForm articleId ={_id}/>
                            <div className= "comments">
                                {comments.map((comment) => (
                                    <div key={comment._id} className = 'comment'>
                                        <p className = "comment-author">{comment.commentAuthor} commented
                                            <span> on {comment.createdAt}</span>
                                        </p>
                                        
                                        <p className = "comment-text">{comment.commentText}</p>
                                        
                                    </div>
                                ))}

                            </div>
                            
                        </div>

                    </div>
                </>    
            ) : (
                <h4 style= {{fontSize: '30px', color: "var(--bittersweet)"}}>
                    Kindly login to view this article
                </h4>
            )}
        </div>
    )
}

export default SingleArticle