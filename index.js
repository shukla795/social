const express = require("express")
const app = express();

const mongoose = require("mongoose")
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")
const UserRoute = require("./routes/Users")
const AuthRoute = require("./routes/Auth")
const PostRoute = require("./routes/Posts")

dotenv.config();

mongoose.connect(process.env.MONGO_URL , {useNewUrlParser:true ,  useUnifiedTopology: true} ,()=>{
     console.log("connected mongoDB")
});

app.use(express.json());
app.use(helmet());
app.use(morgan("common"))

app.use('/api/users',UserRoute);
app.use('/api/auth',AuthRoute);
app.use('/api/posts',PostRoute);

// app.get('/',(req,res)=>{
//     res.send("welcome to Home page")
// })



app.listen(8800,()=>{
    console.log("backend is running...")
})


// MONGO_URL = mongodb+srv://Harshit:<1234>@cluster0.qaljv.mongodb.net/social?retryWrites=true&w=majority