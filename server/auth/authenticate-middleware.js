/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken'); //imports jsonwebtoken

const { jwtSecret } = require('../config/secret.js'); //imports secret from config

module.exports = (req, res, next) => {
  console.log('checking token in middleware.js')
  const {authorization} = req.headers;
  (authorization) ? //if truthy

    jwt.verify(authorization, jwtSecret, (err, decodedToken) =>{
      (err) ? //if truthy
      res.status(401).json({message: 'Invalid Credentails'}) : //else
      (req.decodedToken = decodedToken, next())
    }) : //else
      
      res.status(401).json({ you: 'shall not pass!' });
};
