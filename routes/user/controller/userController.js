const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {
    // isEmail,
    isEmpty,
    // isAlpha,
    // isAlphanumeric, 
    // isStrongPassword
} = require('../../utils/authMethods')


//imported 'isEmpty' function, do not need the one below
// function checkIsEmpty(target){
//     if(target.length === 0){
//         return true
//     }else{
//         return false
//     }
// }

async function signUp(req, res, next){
    const { username, email, firstName, lastName, password} = req.body
    const {errorObj} = res.locals

    //DONT NEED B/C WE HAVE MIDDLEWARE LINE 27-48
    // if(Object.keys(req.body).length === 0){ username === undefined ||
    //      email === undefined || 
    //      password === undefined || 
    //      firstName === undefined || 
    //      lastName === undefined ){
    //         res.status(500).json({message: "Please fill out the form"})
    //     }else{
            // if(!isAlphanumeric(username)){
            //     errorObj.username = 'Username must contain only alphanumeric chars'
            // }
            // if(!isAlpha(firstName)){
            //     errorObj.firstName = 'First name must contain only letters'
            // }
            // if(!isAlpha(lastName)){
            //     errorObj.lastName = 'Last name must contain only letters'
            // }
            // if(!isEmail(email)){
            //     errorObj.email = 'Email must be valid'
            // }
            // if(!isStrongPassword(password)){
            //     errorObj. password = 'Password must be 8 chars, 1 capital, 1 lowercase, 1 special char'
            // }
            if(!isEmpty(Object.keys(errorObj))){//grab everything in error obj and check if empty
               return res.status(500).json({message: 'error', errorObj})
            } //can use a 'else' statement with antoher res statement instead of return
            try {
                const hash = await bcrypt.hash(password, 10)
                const createdUser = new User({
                    username,
                    email,
                    firstName,
                    lastName,
                    password : hash
                })

                 await createdUser.save()  //const savedUser =  can create a new variable 
                res.json({message: "success", data: createdUser})
            } catch (error) {
                res.status(500).json({message: "failed", error: error.message})
            }

        }

async function signIn(req, res, next){
    const {email, password} = req.body
    const {errorObj} = res.locals

    if(Object.keys(errorObj).length > 0){
        return res.status(500).json({message: "failure", payload: errorObj})
    }

    try {
        const foundUser = await User.findOne({email: email}) //findOne method --> keeps from returning array of all User info & finds 1
        if(!foundUser){
            return res.status(400).json({message: "Failed. Please check username or password"})
        }else{
            const comparedPassword = await bcrypt.compare(password, foundUser.password)
            console.log(comparedPassword)
            if(!comparedPassword){
                return res.json({message: "failure", payload: "Please check user or pass"})
            }else{
                const jwtToken = jwt.sign(      //using jwt package
                    { //info we want to encode in token
                        email: foundUser.email,
                        username: foundUser.username,
                        id: foundUser._id
                    },
                    //encode a secret key, tells ourselves it originated from our server; key no one else sees except your server; a string
                     process.env.PRIVATE_JWT_KEY,  //w/ the process it is now secure --> before and not secure"literally anything",  //this is why we use dotenv
                    {
                        expiresIn: '1d'  //1d = one day
                    } 
                ) 
                res.json({
                    message: "logged in",
                    payload: jwtToken
                })
            }
            // res.json({message: "success", payload: foundUser})
        }
    } catch (error) {
        res.json({messgae: "Error", error: error.message})
    }
}


//getUserByID 
async function getUserById(req, res, next){
  const {id} = req.params 
  try { 
    const foundUser = await User.findOne({_id:id})   //find --> arr w/an object , findOne -->give obj instead of array; findById --> feed id in as string
        if(!foundUser){
            res.status(400).json({message: "No user found."})
        }else{
            res.json({message:"User found", payload: foundUser})
        }
    }catch (error) {
        res.json({messgae: "Error, unable to find User", error: error.message})
    } 
}




async function updateUser(req, res){
    try {
        const incomingData = req.body  //no need to destructure, only updating what is in the body
        const {id} = res.locals.decodedJwt //stored and available from JWT middleware function
        const updatedUser = await User.findByIdAndUpdate(id, incomingData, {new: true})
        res.json({message: "user updated", payload: updatedUser})

    } catch (error) {
        res.status(500).json({message: 'failure', error: error.message})
    }
    
    
}





module.exports = {
    signUp,
    signIn,
    getUserById,
    updateUser
}