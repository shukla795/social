const route = require("express").Router()
const User = require("../Models/User")

const bcrypt = require("bcrypt")

route.post('/register',  async (req,res)=>{
        // res.send("welcome to auth page")
              
//    we are using aysnc & await that why we use try & catch 
     try{
        // generate the hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(req.body.password , salt)

        // generate the new user
        const user = await new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedpassword
        })

        //   save data & return the json responce
       const newUser =  await  user.save();
        res.status(200).json(newUser)
     }catch(err){
        console.log(err)
     }
        res.send("ok")
    })


route.post("/login",async (req,res)=>{
    try{
    const user = await  User.findOne({
        email:req.body.email 
    })   
     !user && res.status(404).json("user not found")
     
    const validpassword =  await bcrypt.compare(req.body.password , user.password)
    !validpassword && res.status(400).json("wrong password")
    
    res.status(200).json(user)
    }catch(err){
        console.log("something went wrong")
    }
})    
      

module.exports = route