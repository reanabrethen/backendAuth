function checkIsUndefinedFunc(req, res, next){
    if(Object.keys(req.body).length === 0){
        return res.status(500).json({message: "Please fill out the form"})
    }else{ //gets it ready to do error check line 5-6
        const errorObj = {}
        res.locals.errorObj = errorObj //.locals is an obj; ability to hold onto an obj through middleware and save data
        next()
    }
}

module.exports = {checkIsUndefinedFunc}