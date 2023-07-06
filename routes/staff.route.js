const express = require('express')
const router = express.Router()


router.get("/",(req,res)=>{
    res.send("i am the staff homepage")
})



module.exports = router