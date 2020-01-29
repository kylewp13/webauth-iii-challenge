const jwt = require('jsonwebtoken');

function restricted(req, res, next) {
    const token = req.headers.authentication
    const secret = process.env.JWT_SECRET;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
           if(err) {
            res.status(401).json({ message: "Please provide correct credentials" });
           } else {
               next();
           }
        })
    } else {
      res.status(401).json({ message: 'No token' });
    }
  }
  
  module.exports = restricted;