const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());//
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const config = require('./config/dev')
mongoose.connect(config.MongoURI, {
    useNewUrlParser: true
}).then(() => console.log('DB Connected!'));


const {User} = require('./models/User')
app.post('/register', (req, res) => {
    //회원가입 client에서 정보오면 (req)
    console.log(req);

    const user = new User(req.body);

    user.save((err, userInfo) => {
        console.log(userInfo);
        if(err) return res.status(400).json({success: false, err});
        return res.status(200).json({success: true});
    })

})

app.post('/login', (req, res) => {

    //clien에서 요청된 id로 db에서 찾음
    User.findOne({id: req.body.id}, function(err, userInfo) {

        if(err) return res.status(400).send(err);
        if(!userInfo) {//유저정보가 없으면
            return res.json({
                loginSuccess: false,
                message: "Id does not exist"
            })
        }


            //id가 db에 있으면 pw가 맞는지 확인
        userInfo.comparePassword(req.body.password, function(err, result) {

            if(err) return res.status(400).send(err);
            if(!result) // pw가 달라서 result값이 없는 경우
                return res.json({ 
                    loginSuccess: false, 
                    message: "Passwords do not match"
                });


            //비밀번호가 맞으면 토큰 생성
            userInfo.makeToken(function(err, userInfo) {
                if(err) return res.status(400).send(err);

                
                //client로 쿠키보내기
                res.cookie('userAuth', userInfo.token).status(200)
                    .json({
                        loginSuccess:true,
                        userId: userInfo._id
                    })
            })
        })
    })

})

const {auth} = require('./middleware/auth');
//callback을 하기전에 중간에 auth가 실행됨
app.get('/auth', auth, (req, res) => {
    //여기까지 왔으면 auth를 통과했음 true임

    //client에 정보를 전달
    res.status(200).json({
        _id:req.user._id,
        id:req.user.id,
        isAuth: true,
        //role == 0 일반유저
        //role == 1 어드민
        isAdmin: req.user.role === 0 ? false : true,
        role: req.user.role
    })
})

app.get('/logout', auth, (req, res) => {
    User.findOneAndUpdate(
        {_id: req.user._id},
        {token: ""},
        (err, user) => {
            if(err) return res.json({logoutSuccess : false, err});

            //로그아웃시 쿠키삭제
            //res.clearCookie('userAuth');
            return res.status(200).json({logoutSuccess:true});
        })
})
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
