const { AuthenticationError } = require('apollo-server-express');
const { User, Article, Comment, Like } = require('../models');
const { signToken } = require('../utils/auth');

// Create the functions that fulfill the queries defined in `typeDefs.js`

const resolvers = {
    Query: {
        // Lists all users including their articles.
        users: async() => {
            return User.find().populate('articles');
        },
        // Finds a single user by email
        user: async(parent, { email }) => {
            return User.findOne({ email })
            .populate('articles')
            .populate({
                path: 'articles',
                populate: 'comments',  
            })
        },
        articles: async(parent, { username }) => {
            const params = username ? { username } : {};
            return Article.find(params)
            .populate('comments')
            .populate('likes')
            .sort({ createdAt: -1})
        },
        article: async(parent, { articleId }) => {
            return Article.findOne({ _id: articleId })
            .populate('comments')
            .populate('likes');
        },
        comments: async(parent, { articleId }) => {
            const params = articleId ? { articleId } : {};
            return Comment.find(params).sort({ createdAt: -1 });
        },
        likes: async(parent, { articleId }) => {
            const params = articleId ? { articleId } : {};
            return Like.find(params).sort({ createdAt: -1 });
        },
        
    },
    // Set up mutations to handle creating a user, logging a user in, adding, removing and updating articles.
    Mutation: {
        addUser: async(parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async(parent, { email, password}) => {
            const user = await User.findOne({ email });
            if(!user) {
                throw new AuthenticationError('Incorrect email');
            }
            const correctPassword = await user.isCorrectPssword(password);

            if (!correctPassword) {
                throw new AuthenticationError('Incorrect Password!');
            }
            const token = signToken(user);
            return { token, user };
        },
        addArticle: async(parent, { title, image, articleText, articleAuthor }) => {
            const article = await Article.create({ title, image, articleText, articleAuthor });
                await User.findOneAndUpdate(
                    { username: articleAuthor },
                    { $addToSet: { articles: article._id }}
                    )
            return article;
        },
        addComment: async(parent, { articleId, commentText, commentAuthor }) => {
            const comment = await Comment.create({ commentText, commentAuthor});
            const article = await Article.findOneAndUpdate(
                    { _id: articleId },
                    { $addToSet: { comments: comment._id } },
                    {new: true,
                    runValidators: true }
                    );
            return article;
        },
        addLike: async(parent, { articleId, likeAuthor }) => {
            const like = await Like.create({ likeAuthor });
            const article = await Article.findOneAndUpdate(
                { _id: articleId },
                { $addToSet: { likes: like._id } }
            );
            return article;
        },
        removeArticle: async(parent, { articleId }) => {
            return Article.findOneAndDelete({ _id: articleId });
        },
        removeComment: async(parent, { articleId, commentId }) => {
            const article = await Article.findOneAndUpdate(
                { _id: articleId },
                { $pull: { comments: commentId }},
                { new: true }
            );
            return article;
        },
        removeLike: async(parent, { articleId, likeId }) => {
            const article = await Article.findOneAndUpdate(
                { _id: articleId },
                { $pull: { likes: likeId }},
                { new: true },
            )
            return article;
        },
        updateArticle: async(parent, { articleId, title, articleText }) => {
            const updatedArticle = await Article.findOneAndUpdate(
                { _id: articleId },
                { title, articleText },
                { new: true }
            );
            return updatedArticle;
        }
    }
}

module.exports = resolvers;