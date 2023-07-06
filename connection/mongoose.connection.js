const mongoose = require('mongoose')
let URI = process.env.URI

mongoose.connect(URI)
.then(()=>{
    console.log("mongoose has connected successfully");
})
.catch((err)=>{
    console.log(err);
});