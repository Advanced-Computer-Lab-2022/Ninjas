const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config();
const userRouter = require("./routers/userRouter");
const bodyParser = require("body-parser");
const instructorRouter = require("./routers/instructorRouter");

const mongoURI = 'mongodb+srv://ninjasacl:0000@ninjasdb.7zekcbd.mongodb.net/test' ;
console.log(mongoURI);


const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

module.exports = app;
const port = process.env.PORT || "8000";

// if you see the /, go use the userRouter
app.use('/',userRouter);

//if you see the /, go use the instructorRouter
app.use('/', instructorRouter);


mongoose.connect(mongoURI)
.then(()=>{
  console.log("MongoDB is now connected!")
// Starting server
 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  })
})
.catch(err => console.log(err));





