const mongoose = require('mongoose');
const moment = require('moment');


const commentSchema = mongoose.Schema({
    writer: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    postId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Post'
    },
    text: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    parentComment: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Comment'
    }
}, { timestamps: { currentTime: () => getCurrentDate() } })

function getCurrentDate(){
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const today = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();
    return new Date(Date.UTC(year, month, today, hours, minutes, seconds, milliseconds));
}

const Comment = mongoose.model('Comment', commentSchema);

module.exports ={ Comment } 