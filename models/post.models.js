const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        postId: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true,
            maxlength: 500,
        },
        video: {
            type: String,
        },
        likers: {
            type: [String],
            required: true
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('post', PostSchema);