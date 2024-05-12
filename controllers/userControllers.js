const userModel = require('../models/userModels')
const bcrypt = require('bcrypt')

const createUser = async (req,res) => {

    //res.send("Create user API is Working!")

    //1. Check incoming data
    console.log(req.body);

    //2. Destructure the incoming data
    const {firstName, lastName, email, password} =req.body;

    //3. Validate the data (If empty, stop the process and send res)
    if(!firstName || !lastName || !email || !password){
        res.send("Please enter all field!")
        //res.send("Please enter all fields!")
        res.json({
            "success" : false,
            "message" : "Please enter all fields!"
        })

    }
    //4. Error Handeling(Try Catch)
    try{
        //5. Check if the user is already registered
        const existingUser= await userModel.findOne({email :email})

         //5.1 If user found: Send Response 
         if(existingUser){
            return res.json({
                "status": false,
                "message" : "User Already Exists!"
            })
         }

         //Hasing/Encryption of the password
         const randomSalt = await bcrypt.genSalt(10)
         const hashedPassword = await bcrypt.hash(password,randomSalt)
  

    //5.2 If user is new: 
    const newUser = new userModel({
        //database Fields: Cliennt,s Value
        firstName : firstName,
        lastName : lastName,
        email : email,
        password : hashedPassword
    })

    //Save to database
    await newUser.save()

    //Send the resopnse
    res.send({
        "success" : true,
        "message" : "User Created Successfully!"
    })

    

    } catch(error) {
        console.log(error)
        res.json({
            "success" : false,
             "message" : "Internal server error!"

    })


    //5. Check if the user is already registered
    //5.1 If user found: Send Response 
    //5.1.1 Stop the process

    //5.2 If user is new: 
    //5.2.1 HAsh the password
    //5.2.2 Save to the database
    //5.2.3 Send the successfull response


    }
}

//Write a logic for Login

    //1. Check incoming data
    //2. Destructure the incoming data
    //3. Validate the data
    //4. Error Handeling(Try Catch)




//Exporting
module.exports =  {
    createUser
}