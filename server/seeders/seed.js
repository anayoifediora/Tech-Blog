const db = require('../config/connection');
const { User, Article, Comment, Like } = require('../models');
const userSeeds = require('./userSeeds.json');
const articleSeeds = require('./articleSeeds.json');
const commentSeeds = require('./commentSeeds.json');
const likeSeeds = require('./likeSeeds.json');

db.once('open', async () => {
    
    try {
        await User.deleteMany({});
        await Article.deleteMany({});
        await Comment.deleteMany({});
        await Like.deleteMany({});

        await User.create(userSeeds);

        for (let i = 0; i < articleSeeds.length; i++) {
            const { _id, articleAuthor } = await Article.create(articleSeeds[i]);
            const user = await User.findOneAndUpdate(
                { username: articleAuthor },
                {
                    $addToSet: {
                        articles: _id,
                    },
                }
            );
        }
        for (let i = 0; i < commentSeeds.length; i++) {
            const { _id, articleId } = await Comment.create(commentSeeds[i]);
    
            const article = await Article.findOneAndUpdate(
                { _id: articleId },
                {
                    $addToSet: {
                        comments: _id,
                    },
                }
            );
        }
        for (let i = 0; i < likeSeeds.length; i++) {
            const { _id, articleId } = await Like.create(likeSeeds[i]);
    
            const article = await Article.findOneAndUpdate(
                { _id: articleId },
                {
                    $addToSet: {
                        likes: _id,
                    },
                }
            );
        }
        
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
    console.log('all done!');
    process.exit(0);
})