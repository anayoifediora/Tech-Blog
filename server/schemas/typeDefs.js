const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        articles: [Article]
        comments: [Comment]
        likes: [Like]
    }

    type Article {
        _id: ID
        title: String
        image: String
        articleText: String
        articleAuthor: String
        createdAt: String
        comments: [Comment]!
        likes: [Like]!
        commentCount: Int
        likeCount: Int
    }

    type Comment {
        _id: ID
        commentText: String
        commentAuthor: String
        createdAt: String
    }

    type Like {
        _id: ID
        likeAuthor: String
        createdAt: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        user(username: String!): User
        articles(username: String): [Article]
        article(_id: ID!): Article
        comments(articleId: ID!): [Comment]
        comment(_id: ID!): Comment
        likes(articleId: ID!): [Like]
        like(_id: ID!): Like
        me: User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addArticle(title: String!, image: String, articleText: String!, articleAuthor: String!): Article
        addComment(articleId: ID!, commentText: String!, commentAuthor: String!): Article
        addLike(articleId: ID!, likeAuthor: String!): Article
        removeArticle(articleId: ID!): Article
        removeComment(articleId: ID!, commentId: ID!): Article
        removeLike(articleId: ID!, likeId: ID!): Article
        updateArticle(articleId: ID!, title: String, articleText: String): Article
    }
`;

module.exports = typeDefs;