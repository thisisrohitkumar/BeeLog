const { verifyToken } = require("../services/auth.service");

const checkAuthority = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const token = req.cookies["jwt"];

      if (!token) {
        return res.send("token not provided");
      }

      const user = await verifyToken(token);

      if (!user) {
        return res.send("invalid token");
      }

      if (user.role === requiredRole || requiredRole === '') {
        return next();
      } else {
        return res.send("Unauthorised User!");
      }
    } catch (error) {
      return res.send("internal server error");
    }
  };
};

module.exports = {
  checkAuthority,
};
