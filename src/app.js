const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config();
const userRouter = require("./routers/userRouter");
const bodyParser = require("body-parser");
const adminRouter = require("./routers/adminRouter");
const instructorRouter = require("./routers/instructorRouter");
const path = require('path');
const mongoURI = process.env.mongoURI;
const app = express();
var sess = null ;
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
var cors = require('cors');
const { requireAuth, sessionDetails } = require("./middleware/authMiddleware");
const router = require("./routers/logsign");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const userController = require("./controllers/userController");

app.use(cors()) 
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.TOKEN,
  resave: false,
  saveUninitialized: false,
}))



const port = process.env.PORT || "8000";
//login and signup do not require an authenticated user

app.get('/login', async (req, res) => {
  try {
      //should be changed in the evaluation
      const maxAge = 3 * 24 * 60 * 60;

      console.log( 'entered');
      const { username, password } = req.query;
      const { user, token } = await userController.login({ username, password });

      //we will update our session in the middleware
      sessionDetails.setSession(req.session);
      sessionDetails.sessionUserID(user._id);
      sessionDetails.sessionUserType(user.type);
      sessionDetails.sessionUsername(username);

      sessionDetails.pushSession();


      console.log(sessionDetails.getSession(req.session.id));


      //unique identifier for key-value table of cookies
      const key = username+'jwt';
      res.cookie(key, token, { httpOnly: true, maxAge: maxAge * 1000 });
  

      res.status(200).json(user);
  }
  catch (error) {
      res.status(500).json(error.message);
  }
})

app.use('/login', router);
app.use('/signUp', router);



app.use('/admin', requireAuth, adminRouter);
// if you see the /, go use the userRouter
app.use('/', requireAuth, userRouter);


//if you see the /, go use the instructorRouter
app.use('/', requireAuth, instructorRouter);

//telling server if u want to find the views go to src/views (as __dirname is file directory)
app.set('views', path.join(__dirname, 'views'));
//telling the server that views have html files
app.set('view engine', 'html');

mongoose.connect(mongoURI)
  .then(() => {
    console.log("MongoDB is now connected!")
    // Starting server
    app.listen(port, () => {
      console.log(`Listening to requests on http://localhost:${port}`);
    })
  })
  .catch(err => console.log(err));

  module.exports = {app , sess };




