const express = require("express")
const mongoose =require("mongoose")
const cors =require("cors")



const  app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

// mongoose.connect('mongodb://localhost:27017/myLoginRegisterDB',{
//     useNewUrlParser:true,
//     useUnifiedTopology:true,
// },()=>{
//     console.log("DB connected");
// })
mongoose.connect('mongodb+srv://coderx:1234@cluster0.jltcz.mongodb.net/Informations?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
},()=>{
    console.log("DB connected");
})

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    
})


const User = new mongoose.model("User",userSchema)

//Routes

app.post("/login",(req,res)=>{
    const {email,password}=req.body
    User.findOne({email:email},(err,user)=>{
        if(user){
        if(password===user.password){
            res.send({messege:"loginSuccesfull",user:user})
        }else{
            res.send({message:"password didnt match"})
        }
        }else{
            res.send({message:"user not registered"})
        }
    })
})

app.post("/register",(req,res)=>{
    const {name,email,password}=req.body

    User.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message:"User already exists"})
        }
    })

    const user = new User({
        name,
        email,
        password,
        
    })
    user.save(err=>{
        if(err){
            res.send(err)
        }else{
            res.send({message:"Successfully registered"})
        }
    })
    // console.log(req.body)
})


app.listen(9002,()=>{
    console.log("BE started at port {http://localhost:9002}")
})