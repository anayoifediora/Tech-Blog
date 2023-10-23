const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateformat');

// Create the Like Schema
const likeSchema = new Schema({
    likeAuthor: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
}
);

// Create the Like model using the likeSchema
const Like = model('Like', likeSchema);

// Export the Like model
module.exports = Like;