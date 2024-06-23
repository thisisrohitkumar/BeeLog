const { verifyToken } = require("../services/auth.service");

const checkAuthenticity = (req, res, next) => {
  const token = req.cookies["jwt"];
  if (token) {
    return res.redirect("/");
  }
  return next();
};

const checkIfUserLoggedIn = async (req, res, next) => {
  const token = req.cookies["jwt"];
  if (!token) {
    return res.render("login", { msg: "~ Login is required! ~"});
  }

  const payload = await verifyToken(token);

  if(!payload){
    return res.render("login", { msg: "~ Invalid Token! ~"});
  }

  req.user = payload;
  
  return next();
};

module.exports = {
  checkAuthenticity,
  checkIfUserLoggedIn,
};
