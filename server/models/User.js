const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// Create the User Schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    articles: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Article',
        },
    ],
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
}
);

// Set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});



// Compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};


// Create the User model using the UserSchema
const User = model('User', userSchema);

// Export the User model
module.exports = User;