const checkAuthenticity = (req, res, next) => {
    const token = req.cookies['jwt'];
    if(token){
        return res.send('first logout')
    }
    return next();
}

const checkIfUserLoggedIn = (req, res, next) => {
    const token = req.cookies['jwt'];
    if(!token){
        return res.send('first login')
    }
    return next();
}

module.exports = {
    checkAuthenticity,
    checkIfUserLoggedIn
}