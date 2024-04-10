const express = require('express')
const logger = require('morgan')

const app = express()

const userRouter = require('./routes/user/userRouter')

app.use(logger('dev'))
app.use(express.json())

app.use('/user', userRouter)

module.exports = app