const mongoose = require('mongoose')

let userSchema= new mongoose.Schema({
    item:{type:String, required:true, unique:true},
    time:{type:String, required:true},
    date:{type:String, required:true}
})
let userModel= mongoose.model('users', userSchema)

module.exports = userModel