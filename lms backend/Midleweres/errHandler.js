const errHandler = (err, req, res, next) => {
    if(err.name === 'ValidationError') {
        const Errors = {}
        for(field in err.errors) {
            Errors[field] = err.errors[field].message
        }
        return res.status(400).json(Errors)
    }else {
        const {status = 500, message = 'Somsething wrong with the server'} = err
        res.status(status).json({message: message})
    }
}

export default errHandler;