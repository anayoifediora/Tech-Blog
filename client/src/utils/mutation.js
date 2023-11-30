import { gql } from '@apollo/client';

// Mutation to login a user
export const LOGIN_USER = gql`
    mutation Mutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
        }
    }
`
//Mutation to create a user

export const ADD_USER = gql`
    mutation Mutation($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
        }
        }
    }
`
//Mutation to add a comment 
export const ADD_COMMENT = gql`
    mutation Mutation($articleId: ID!, $commentText: String!, $commentAuthor: String!) {
        addComment(articleId: $articleId, commentText: $commentText, commentAuthor: $commentAuthor) {
        _id
        createdAt
        comments {
            createdAt
            commentText
            commentAuthor
            _id
        }
        commentCount
        }
    }
`
//Mutation to like an article
export const ADD_LIKE = gql`
    mutation Mutation($articleId: ID!, $likeAuthor: String!) {
        addLike(articleId: $articleId, likeAuthor: $likeAuthor) {
        likes {
            _id
            createdAt
            likeAuthor
        }
        likeCount
        _id
        createdAt
        }
    }
`