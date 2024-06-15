const checkAuthenticity = (req, res, next) => {
    const token = req.cookies['jwt'];
    if(token){
        return res.redirect('/')
    }
    return next();
}

const checkIfUserLoggedIn = (req, res, next) => {
    const token = req.cookies['jwt'];
    if(!token){
        return res.redirect('/login')
    }
    return next();
}

module.exports = {
    checkAuthenticity,
    checkIfUserLoggedIn
}