const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const  saltRounds = 10
const jwt = require('jsonwebtoken');
const { TokenExpiredError } = require('jsonwebtoken');

const userCchema = mongoose.Schema({
    name:{
        type : String,
        maxlength: 50
    },
    email:{
        type: String,
        trim: true,
        unique: 1
    },
    password:{
        type: String,
        maxlength: 50
    },
    role:{
        type: Number,    
        default: 0
    },
    image: String,
    token:{
        type: String
    },
    tokenExp:{  //토큰 유효기간
        type: Number
    }
})

//user스키마를 저장하기 전에 무엇을 하겠다는 함수
userCchema.pre('save', function(next){

        var user = this;

        //모델안의 비밀번호가 변환될 때만 암호화해준다.
        if(user.isModified('password')){
        //비밀번호를 암호화시킨다.
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    } else{
        next()
    }
})

userCchema.methods.comparePassword = function(plainPassword, cb){
    //plainPassword 1234567     암호화된 비밀번호 $2b$10$dbvbfSptmeEpDK/Td4Cz6.uj6u5203VpcgPpMdEHby/bkRvMxbKZS
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err),
            cb(null, isMatch)   //에러는 없고 비밀번호는 같다.
    })
}

userCchema.methods.generateToken = function(cb){

    var user = this;

    //jsonwebToken을 이용해서 token을 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    //user._id + 'secretToken' =  token

    user.token = token
    user.save(function(err,user){
        if(err) return cb(err)
        cb(null,user)
    })
}

userCchema.statics.findByToken = function(token, cb){
    var user = this;

    //user._id + '' = token = secretToken
    //토큰을 decode한다.
    jwt.verify(token, 'secretToken', function(err, decoded){
        //유저 아이디를 이용해서 유저를 찾은 다음에
        //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
        user.findOne({"_id":decoded, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null, user)
        })
    })
}


const User = mongoose.model('User', userCchema)

//모델을 다른 파일에서도 쓸 수 있도록
module.exports = {User}