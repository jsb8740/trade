const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
    originalFilename: {
        type: String
    },
    serverFilename: {
        type: String
    },
    size: {
        type: Number
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    uploadedBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true  //로그인한유저만 파일업로드 가능해서
    },
    postId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Post'
    },
})

fileSchema.statics.findPostId = function(uploadedBy, cb) {

    File.findOne({uploadedBy: uploadedBy}, function(err, fileData) {
        console.log(fileData)
    })

}

const File = mongoose.model('File', fileSchema);

module.exports = { File };