const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongoURI = process.env.mongoURI;
console.log(mongoURI);

const app = express();
const port = process.env.PORT || "8000";
const account = require('./models/account');
const InstructorToCourses = require('./models/InstructorToCourses');
const courseRatings = require('./models/courseRatings');
mongoose.connect(mongoURI)
.then(()=>{
  console.log("MongoDB is now connected!")
// Starting server
 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  })
})
.catch(err => console.log(err));


