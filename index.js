const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')
require('./connection/mongoose.connection')

let PORT = process.env.PORT_NUMBER || 4900





const studentRouter = require('./routes/student.route')
app.use("/students", studentRouter)

const staffRouter = require('./routes/staff.route')
app.use("/staff", staffRouter )

let userModel = require('./models/user.model')


app.get('/todohomepage',(req,res)=>{
    userModel.find()
    .then((result)=>{
        if (result) {
            res.render("todohomepage",{userTodo:result})
        }
        console.log(result);
    })
    .catch((err)=>{
        console.log(err);
    })

})

app.post('/details',(req,res)=>{
    let form = new userModel(req.body)
    form.save()
    .then((result)=>{
        console.log(result);
        res.redirect("/todohomepage")
    })
    .catch((err)=>{
        console.log(err);
})

})

app.post("/delete",(req,res)=>{
    console.log(req.body);
    userModel.findOneAndDelete({item:req.body.todoEdit})
    .then((result)=>{
        console.log(result, "item deleted successfully");
        res.redirect('/todohomepage')

    })
    .catch((err)=>{
        console.log(err);
    })
})
app.post("/edit",(req,res)=>{
    userModel.findOne({item:req.body.todoEdit})
    .then((result)=>{
            if (result) {
                res.render("edittodo", {info:result})
                
            }
       
    })
    .catch((err)=>{
        console.log(err);
    })
})
app.post("/update",(req,res)=>{
    console.log(req.body);
    userModel.updateOne({item:req.body.item}, req.body)
    .then((result)=>{
        if (result) {
            console.log(result);
            res.redirect("/todohomepage")
            
        }
    })
    .catch((err)=>{
        console.log(err);
    })
    
})


app.listen(PORT,()=>{
    console.log(`Server has started on port ${PORT}`);
})