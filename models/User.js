const mongoose = require('mongoose');

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

const User = mongoose.model('User', userCchema)

//모델을 다른 파일에서도 쓸 수 있도록
module.exports