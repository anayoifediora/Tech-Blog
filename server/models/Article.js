const { Schema, model } = require('mongoose');
// const dateFormat = require('../utils/dateformat');

// Create the Article schema
const articleSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: false,
        match: [/\.(png|svg|jpg|jpeg|gif)$/]
    },
    articleText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 10800,
        trim: true,
    },
    articleAuthor: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //get: (timestamp) => dateFormat(timestamp),
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Like',
        },
    ],
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
});

// Create a virtual called commentCount that retrieves the length of the article's comments array field on query
articleSchema.virtual('commentCount')
.get(function() {
    return this.comments.length;
});

// Create a virtual called likeCount that retrieves the length of the article's likes array field on query
articleSchema.virtual('likeCount')
.get(function() {
    return this.likes.length;
});

// Create the Article model using the ArticleSchema
const Article = model('Article', articleSchema);

//Export the Article model
module.exports = Article;