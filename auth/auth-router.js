const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js')
const {jwtSecret} = require('../config/secret.js')

//register endpoint
router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash; //hashes the password in user object

  //Using user model insert the user
  Users.add(user)
    .then(saved => {
      res.status(201).json(saved); //returns saved user
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  const {username, password} = req.body;

  Users.findBy({username})
    .first()
    .then(user =>{
      //if theres a match, bcrypt compares the password in the body vs the hashed one in the server
      if(user && bcrypt.compareSync(password, user.password)){
        //there's a match! now let's generate a token
        const token = generateToken(user);  //pass the user in to sign the token with user id
        //respond to the request with a json body that includes the token
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token,
        });
      }else{
        //if username and password don't match any records
        res.status(401).json({message: "Invalid Credentails"})
      }
    }).catch(error =>{
      res.status(500).json(error)
    })
});

module.exports = router;

function generateToken(user){
  const payload ={
    subject: user.id,
    username: user.username,
    role: user.role || "user", //assigns role of user 
  };
  const options = {
    expiresIn: "1h" //token expires in 1h
  };
  return jwt.sign(payload, jwtSecret, options); //signs the token with the payload, the secret and the options
}
