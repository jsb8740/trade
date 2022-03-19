const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    writer: {
        type:mongoose.SchemaTypes.ObjectId, 
        ref:'User'
    },
    fileId: [{
        type:mongoose.SchemaTypes.ObjectId, 
        ref:'File'
    }],
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

postSchema.index({title: 'text', description: 'text'})
const Post = mongoose.model('Post', postSchema);

module.exports = { Post };
