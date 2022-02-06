const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type:String,
        maxlenth:50
    },
    password: {
        type:String,
        minlength:4,
        maxlenth:16
    },
    id: {
        type:String,
        trim:true,
        unique:true
    },
    role: {
        type:Number,
        default: 0
    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

const saltRounds = 10;  //salt가 몇글자인지 10자리인 salt를 만듦
userSchema.pre('save', function(next) {
    var user = this;    //스키마 객체

    //비밀번호를 암호화

    if(user.isModified('password')) {
        //salt 생성
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err);

            
            //암호화
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err);
                // Store hash in your password DB.
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    //plainPassword = 12345같은 패스워드 이걸 암호화된비밀번호랑 같은지 체크
    bcrypt.compare(plainPassword, this.password, function(err,  result) {
        if(err) return cb(err);

        return cb(null, result);
    })
}

userSchema.methods.makeToken = function(cb) {
    var user = this;

    //jsonwebtoken로 token을 생성함
    //_id를 payload로 사용하러면 toJSON()으로 바꿔줘야함
    //user._id + secretToken = token
    var token = jwt.sign(this._id.toJSON(), 'secretToken')

    user.token = token;
    user.save(function(err, userInfo) {
        if(err) return cb(err);
        return cb(null, userInfo);
    })
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    //token을 decoded함
    jwt.verify(token, 'secretToken', function(err, decdoed) {
        if(err) return cb(err);
        //client에서 가져온 토큰과 db의 토큰 일치하는지 확인
        user.findOne({"_id":decdoed, "token":token}, function(err, userInfo){
            if(err) return cb(err);

            return cb(null, userInfo);
        })
    })
}

const User = mongoose.model('User', userSchema);



module.exports = { User };