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