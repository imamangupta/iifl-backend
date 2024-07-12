const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    dataType: {
        type: String
    },
    postData: [ ],
    date: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post', postSchema);
Post.createIndexes();
module.exports = Post;