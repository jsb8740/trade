const express = require('express')
const router = express.Router();
const {Post} = require('../models/Post');
const multer = require('multer');
const { File } = require('../models/File')
const fs = require('fs');
const mongoose = require('mongoose');

router.get('/write', (req, res) => {

    // console.log('----write----')
    // console.log(req.query)

    const post = new Post(req.query);
    if(req.query.fileId) { //fileId가 있으면 실행  // populate 때문에 db저장하려고
        post.save((err, postData) => {
            if(err) return res.status(400).json({writeSuccess: false, err});
            // console.log(postData)
            return res.status(200).json({writeSuccess: true, postIdExist: true, postData});
        })
    } else { //fileId가 없으면 그냥 데이터만 보냄
        return res.status(200).json({postIdExist: false, post})
    }
    
})

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './images/');
        //저장할 경로
    },
    filename: function(req, file, cb) {

        var mimeType;

        switch(file.mimetype) {
            case "image/jpeg":
                mimeType = "jpg";
                break;
            case "image/png":
                mimeType = "png";
                break;
            case "image/gif":
                mimeType = "gif";
                break;

            default:
                mimeType = 'jpg';
                break;
        }

        cb(null, file.fieldname + '-' + Date.now() + '.' + mimeType)
        //file 이름 설정
    },
})
const upload = multer({storage: storage})

router.post('/uploadFile', upload.array('files'), (req, res, next) => {

    let fileArray = []; //client 보낼 json배열 data file들의 정보가 들어있음
    let fileSave = {};  //mongoose에 저장할 용도인 객체

    // console.log(req.body.writer)
    

    for(var i=0; i<req.files.length; i++) {
        fileSave.originalFilename = req.files[i].originalname
        fileSave.serverFilename = req.files[i].filename
        fileSave.size = req.files[i].size
        fileSave.uploadedBy = req.body.writer
        fileSave.postId = req.body.postId
        
        fileArray.push(fileSave);
        fileSave={}; //비우기

        // console.log(req.files[i]);
    }
    File.insertMany(fileArray, function(err, files) {
        if(err) return res.status(400).json({uploadSuccess: false, err});
        return res.status(200).json({ 
            uploadSuccess: true, 
            files
        });
    })
})

router.get('/pagination', (req, res) => {
    // console.log(req.query)

    Post.find().exec((err, postData) => {
        // console.log('-----------pagination')
        // console.log(postData.length)
        if(err) return res.status(400).json({pagination: false, err});

        return res.status(200).json({
            postLength: postData.length,
            pagination: true
        })
    })
})

router.post('/getPosts', (req, res) => {
    
    Post.find().populate('writer').populate('fileId').sort({createdAt: -1}).skip(req.body.skip).limit(req.body.limit)
        .exec((err, posts) => {
            if(err) return res.status(400).json({getPosts: false, err});

            return res.status(200).json({
                posts: posts,
                getPosts: true
            })
        })
})

const SeverimgDelete = (req, res, next) => {
    console.log(req.body)
    for(var i=0; i<req.body.delete_filesId.length; i++) {
        File.find({_id: req.body.delete_filesId[i]} ).exec(function(err, files) {
            console.log(files)
            // console.log(files[0].serverFilename)
            //db에서 파일의 serverFilename을 찾아서 서버 폴더에있는 사진 삭제
                
            if(fs.existsSync(`./images/${files[0].serverFilename}`)) {
                //file이 존재하면 true 없으면 false 반환
                fs.unlink(`./images/${files[0].serverFilename}`, function(err) {
                    if(err) return res.status(400).json({filedelete: false, err});
                });//파일삭제
            }
            
        })
        if(i=== req.body.delete_filesId.length-1)
            next();
    }
    
}
const dbImgDelete = (req, res, next) => {
    console.log(req.body)
    for(var i=0; i<req.body.delete_filesId.length; i++) {
        const filter = {_id: req.body.delete_filesId[i]}
        //console.log(filter)
        File.findOneAndUpdate(filter, {isDeleted: true}, function(err) {
            if(err) return res.status(400).json({imgDelete:false, err})
        })
    }
    
    next()
}

router.post('/modifyPost', SeverimgDelete, dbImgDelete, (req, res) => {

    // const post = new Post(req.query);
    // console.log(req.body)
    Post.findOneAndUpdate(
        {_id: req.body.postId},
        {fileId: req.body.fileId, title: req.body.title, 
            price: req.body.price,description: req.body.description},
        (err, data) => {
            if (err) return res.json({success: false, err});
            
            return res.status(200).send({success: true, data});
        }
    )
})

router.post('/deletePost', SeverimgDelete, dbImgDelete, (req, res) => {
    // console.log(req.body)
    const filter = {_id: req.body.postId}
    Post.deleteOne(filter, function(err) {
        if(err) return res.status(400).json({postDelete:false, err})

        return res.status(200).json({postDelete: true})
    }) 
})

router.get('/searchPost', (req, res) => {
    // console.log(req.query)
    const keyword = req.query.keyword;
    const search_type = req.query.search_type;
    // console.log(req)
    let search =[];
    if(search_type === 'title_content') {
        search = [{title: new RegExp(keyword)}, 
            {description: new RegExp(keyword)}]
    } else if(search_type === 'title') {
        search = [{title: new RegExp(keyword)}]
    }
    Post.find({ $or: search}).populate('writer').populate('fileId')
        .sort({createdAt: -1}).skip(req.query.skip).limit(req.query.limit)
        .exec((err, posts) => {
            if(err) return res.status(400).json({searchPosts: false, err});

            return res.status(200).json({
                posts: posts,
                searchPosts: true
            })
        })
})

module.exports = router