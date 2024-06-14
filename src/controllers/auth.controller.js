const handleUserLogin = (req, res) => {
    return res.render('index', {
        title: 'login success'
    });
}

module.exports = {
    handleUserLogin
}