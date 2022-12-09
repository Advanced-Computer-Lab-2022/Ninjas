const jwt = require('jsonwebtoken');
require('dotenv').config();
let payload = null;
const requireAuth = (req, res, next) => {
  const usernameToken = req.session.username + 'jwt'
  const token = req.cookies.jwt;
  console.log(token)
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.TOKEN, (err, decodedToken) => {
      if (err) {
        console.log(err)
        console.log('You are not logged in.');
        // res send status 401 you are not logged in
        res.status(401).json({message:"You are not logged in."})
        // res.redirect('/login');
      } else {
        console.log(decodedToken);
        payload = decodedToken;
        //next();
      }
    });
  } else {
    res.status(401).json({message:"You are not logged in."})
  }
};


module.exports = { requireAuth, payload };
