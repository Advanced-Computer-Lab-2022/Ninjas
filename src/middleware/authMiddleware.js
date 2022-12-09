var sess = require("../app");


const requireAuth = (req, res, next) => {
console.log(sess.sess)
 console.log(sess.username);
 console.log(sess.userid);
  if (sess.username && sess.userid){
    next();
  }
  else {
    res.status(401).json({message:'you did not login'})
  }
};


module.exports = { requireAuth };
