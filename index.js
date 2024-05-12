//Impoarting the package(express)
const express = require('express');
const connectDatabase = require('./database/database');
const dotenv = require('dotenv')
const cors = require('cors')
//Creating an express app
const app = express();

//Configure Cors Policy
const corsOptions= {
    origin : true,
    credentials : true,
    optionSuccessStatus : 200
}
app.use(cors(corsOptions))

//Express Hson Config
app.use(express.json())

//dotenv Configuration
dotenv.config()

//Connecting to database
connectDatabase()

//Defining the port
const PORT = process.env.PORT;

//Making a test endpoint 
//Endpoint : POST, GET, PUT, DELETE
app.get('/test', (req,res)=>{
    res.send("Test API is Working!....")
})

//http://localhost:5500/test/

//configuring Routes of User
app.use('/api/user', require('./routes/userRoutes'))

//http://localhost:5500/api/user/create

//Starting the server
app.listen(PORT , ()=>{
    console.log(`Server is Running ons port ${PORT}!`)
}) 