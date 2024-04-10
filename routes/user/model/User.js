const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    
        firstName: {
            type: String
        },
         User : {
            type: String
         },
        lastName: {
            type: String
        }, 
        email : {
            type: String
        },
        password: {
            type: String
        },
        username : {
            type: String
        }
    })

module.exports = mongoose.model('user', userSchema)