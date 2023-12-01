import { gql } from '@apollo/client';

// Query to get all articles
export const QUERY_ARTICLES = gql`
    query allArticles {
        articles {
            _id
            articleAuthor
            title
            likeCount
            image
            createdAt
            commentCount
        }
    }
`;

//Query to obtain a single article
export const QUERY_SINGLE_ARTICLE = gql`
    query Query($articleId: ID!) {
        article(articleId: $articleId) {
        _id
        articleAuthor
        articleText
        createdAt
        image
        title
        likes {
            _id
            createdAt
            likeAuthor
        }
        comments {
            _id
            commentAuthor
            commentText
            createdAt
        }
        commentCount
        likeCount
        }
    }    
`
// Query to obtain articles by a single user.
export const QUERY_MY_ARTICLES = gql`
    query Query($email: String!) {
        user(email: $email) {
        email
        articles {
            _id
            title
            likeCount
            commentCount
            createdAt
            articleText
        }
        }
    }
`