const mongoose=require('mongoose')

var schema= new mongoose.Schema({   // there are out field name
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        requied:true,
        unique:true
    },
    password:{
        type:String,
        requied:true,
    }
})

const userdb=mongoose.model('user',schema); //user is our collection name
module.exports=userdb