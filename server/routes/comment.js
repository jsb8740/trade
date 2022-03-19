const express = require('express')
const router = express.Router();
const {Comment} = require('../models/Comment')

router.post('/writeComment', (req, res) => {
    console.log(req.body)
    const comment = new Comment(req.body);

    comment.save((err, data) => {
        console.log(data)
        if(err) return res.status(400).json({commentSave: false, err});
        return res.status(200).json({commentSave: true, comment: data})
    })
})

router.post('/getComment', (req, res) => {
    // console.log(req.body)
    Comment.find(req.body).populate('writer').sort({createdAt: 1})
        .exec((err, commentData) => {
            // console.log(commentData)
            if(err) return res.status(400).json({commentFind: false, err});
            return res.status(200).json({commentFind: true, commentData})
        })
    return res.status(200)
})

router.post('/modifyComment', (req, res) => {
    console.log(req.body);

    Comment.findOneAndUpdate(
        {_id: req.body._id},
        {text: req.body.text},
        (err, data) => {
            if (err) return res.json({success: false, err});
            
            return res.status(200).send({success: true});
        }
    )
})

router.post('/deleteComment', (req, res) => {
    console.log(req.body);

    Comment.findOneAndUpdate(
        req.body,
        {isDeleted: true},
        (err, data) => {
            if (err) return res.json({success: false, err});
            
            return res.status(200).send({success: true});
        }
    )
})


module.exports = router