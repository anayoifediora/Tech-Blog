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