let mongoose = require('mongoose');
let postschema = new mongoose.Schema({
    content: {
        typr: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
});

const Post = mongoose.model('Post', postschema);
module.exports = Post;