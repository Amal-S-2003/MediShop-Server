const jwt = require("jsonwebtoken");

const jwtMiddleWare = (req, res, next) => {  
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (token) {
      const jwtResponse = jwt.verify(token, process.env.jwt_secret);
      req.payload = jwtResponse.userId;
      next();          
    } else { 
      res.status(401).json("Please provide a token");
    }
  } catch (error) { 
    res.status(403).json("Please Login ");
  }
};

module.exports = jwtMiddleWare;
