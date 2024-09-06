const express = require('express')
const mongoose =  require('mongoose')
const path = require('path')
const port = 3019

const app = express()
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/registers')
const db = mongoose.connection
db.once('open',()=>{
    console.log("Mongodb connection successful")
})

const userSchema= new mongoose.Schema({
    phone_no :number,
    name:String,
    email:String,
    comment:String
})

const Users = mongoose.model("data",userSchema)

app.get('/',(req,res)=>{
    res.send(path.join(__dirname,'form.html' ))
})

app.post('/post',async (req,res)=>{
    const {phone_no,name,email,comment} = req.body
    const user = new Users({
        phone_no,
        name,
        email,
        comment
    })
    await user.save()
    console.log(user)
    res.send("Form Submission Successful")
})

app.listen(port,()=>{
    console.log("Server started")
})
