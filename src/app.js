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
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

module.exports = app;
const port = process.env.PORT || "8000";
app.use('/admin',adminRouter);
// if you see the /, go use the userRouter
app.use('/',userRouter);

//if you see the /, go use the instructorRouter
app.use('/', instructorRouter);

//telling server if u want to find the views go to src/views (as __dirname is file directory)
app.set('views', path.join(__dirname, 'views'));
//telling the server that views have html files
app.set('view engine', 'html');

mongoose.connect(mongoURI)
.then(()=>{
  console.log("MongoDB is now connected!")
// Starting server
 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  })
})
.catch(err => console.log(err));





