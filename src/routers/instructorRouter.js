const express = require("express");
const instructorController = require("../controllers/instructorController");
const instructorRouter = new express.Router();
const DomainError = require('../error/domainError');
const path = require('path');
const { create } = require("../models/question");
const { useId } = require("react");
const { Account } = require("../models/account");


instructorRouter.get('/', async (req, res) => {
  res.sendFile(path.resolve('views/instructorGeneral.html'))
})
instructorRouter.get('/createCo', async (req, res) => {

  res.sendFile(path.resolve('views/createCourseInst.html'));

})
instructorRouter.get('/viewInstReview', async (req, res) => {
  try {


    const userId = req.query.userId;
    console.log(userId);
    const { type } = await Account.findOne({ _id: userId }, { type: 1 })
    .catch((err) => { throw new DomainError("Wrong user Id", 401) });
    if (type != 'INSTRUCTOR') {
      throw new DomainError("unauthorized user: not an instructor", 401);
    }
   
     const viewResults = await instructorController.viewInstReview({ userId });
     console.log(viewResults);
    // var sumRating = 0.0;
    // res.write('<h1>Search results</h1> <hr>')
    // let currentString = "";
    // if (viewResults.length == 0) {
    //   currentString += "No Results";
    //   res.write(currentString);
    // }
    // else {
    //   for (var i = 0; i < viewResults.length; i++) {
    //     currentString += '<p> First Name: ' + viewResults[i].firstName + '<br>' +
    //       'Last Name: ' + viewResults[i].lastName + '<br>' +
    //       'Comment: ' + viewResults[i].text + '<br>' +
    //       'Rating: ' + viewResults[i].rating + '<br>'
    //     '</p> <hr>';
    //     sumRating += viewResults[i].rating;

    //   }

    //   sumRating /= viewResults.length;
    //   currentString += '<p> Course Rating: ' + sumRating; '</p> <hr>';
    //   res.write(currentString);

    // }
    
     return res.status(200).json(viewResults)


  }
  catch (err) {

    if (err instanceof DomainError) {

      res.status(err.code).json({ code: err.code, message: err.message })
    } else {
      res.status(500).json({ code: 401, message: "error internally" });
    }
  }

})

instructorRouter.get('/getCourseRatings', async (req, res) =>{

  try{

    const courseId = req.query.courseId;
    console.log(courseId);
    const viewResults = await instructorController.getCourseRatings({ courseId });
    return res.status(200).json(viewResults)

  }
  catch (err) {

    if (err instanceof DomainError) {

      res.status(err.code).json({ code: err.code, message: err.message })
    } else {
      res.status(500).json({ code: 401, message: "error internally" });
    }
  }

})
instructorRouter.get('/getCourseSubtitles', async (req, res) =>{

  try{

    const courseId = req.query.courseId;
    console.log(courseId);
    const viewResults = await instructorController.getCourseSubtitles({ courseId });
    return res.status(200).json(viewResults)

  }
  catch (err) {

    if (err instanceof DomainError) {

      res.status(err.code).json({ code: err.code, message: err.message })
    } else {
      res.status(500).json({ code: 401, message: "error internally" });
    }
  }

})


instructorRouter.get('/view', async (req, res) => {
  try {


    const username = req.query.username;
    console.log(username)

    /*const { type } =await Account.findOne({ "username": username }, { type: 1 }).catch((err)=>{throw new DomainError("username doesn't exist",401)});
    if (type != 'INSTRUCTOR') {
      throw new DomainError("unauthorized user: not an instructor", 401);
    }*/

    console.log(username)
    const viewResults = await instructorController.getViewResult({ username });
   /* var sumRating = 0;
    res.write('<h1>Search results</h1> <hr>')
    let currentString = "";
    let viewButtonString;
    for (var i = 0; i < viewResults.length; i++) {
      viewButtonString = "";
      currentString += '<p> Course title: ' + viewResults[i].title + '<br>'
        + "Ratings" + viewResults[i].rating + '<br>'
      '</p> <hr>';
      for (var l = 0; l < viewResults[i].reviews.length; l++) {
        currentString += '<p> First Name: ' + viewResults[i].reviews[l].firstName + '<br>' +
          'Last Name: ' + viewResults[i].reviews[l].lastName + '<br>' +
          'Comment: ' + viewResults[i].reviews[l].text + '<br>' +
          'Rating: ' + viewResults[i].reviews[l].rating + '<br>'
        '</p> <hr>';
        sumRating += viewResults[i].reviews[l].rating; 

      }
      sumRating = sumRating / viewResults[i].reviews.length;
      currentString += '<p> Course Rating: ' + sumRating; '</p> <hr>';

      viewButtonString += "<button onclick=\"alert(\'Course Details: \\nSubtitles: \\n"

      for (var j = 0; j < viewResults[i].subtitles.length; j++) {
        viewButtonString += "Subtitle " + (j + 1) + ": " + viewResults[i].subtitles[j].text + ", total hours: " + viewResults[i].subtitles[j].hours +
          ", Video Title: " + viewResults[i].subtitles[j].videoTitles.title + "\\n"
      }

      viewButtonString += "Exercises: \\n"
      for (var k = 0; k < viewResults[i].exercises.length; k++) {
        viewButtonString += "Exercise " + (k + 1) + ": " + viewResults[i].exercises[k].title + "\\n"
      }

      viewButtonString += "\')\">View details</button>";
      currentString += viewButtonString + '<hr>';
      res.write(currentString);
    }*/

    return res.status(200).json(viewResults)

  }
  catch (err) {

    if (err instanceof DomainError) {

      res.status(err.code).json({ code: err.code, message: err.message })
    } else {
      res.status(500).json({ code: 401, message: "username incorrect" });
    }
  }

})

instructorRouter.get('/viewPage', async (req, res) => {
  res.sendFile(path.resolve('views/viewCoursesInst.html'));
})
instructorRouter.get('/createCo', async (req, res) => {

  res.sendFile(path.resolve('views/createCourseInst.html'));

})

instructorRouter.get('/SearchInst', async (req, res) => {
  try {
    const username = req.query.username;
    const search = req.query.search;
    const userId = req.query.userId;

    const { type } = await Account.findOne({ _id: userId }, { type: 1 });
    if (type != 'INSTRUCTOR') {
      throw new DomainError("unauthorized user: not an instructor", 401);
    }


    const SearchResults = await
      instructorController.getSearchResult({ username, search, userId });
    res.write('<h1>Search results</h1> <hr>')
    let currentString = "";
    let viewButtonString;
    for (var i = 0; i < SearchResults.final.length; i++) {
      viewButtonString = "";
      currentString = '<p> Course title: ' + SearchResults.final[i].title + '<br>' +
        'Total hours: ' + SearchResults.final[i].totalHours + '<br>' +
        'Rating: ' + SearchResults.final[i].rating + '<br>' +
        'Price: ' + SearchResults.final[i].price + " " + SearchResults.currency + '<br>' +
        'Summary: ' + SearchResults.final[i].summary + '<br>' +
        '</p> <hr>';
      viewButtonString += "<button onclick=\"alert(\'Course Details: \\nSubtitles: \\n"

      for (var j = 0; j < SearchResults.final[i].subtitles.length; j++) {
        viewButtonString += "Subtitle " + (j + 1) + ": " + SearchResults.final[i].subtitles[j].text + ", total hours: " + SearchResults.final[i].subtitles[j].hours +
          ", Video Title: " + SearchResults.final[i].subtitles[j].videoTitles.title + "\\n"
      }

      viewButtonString += "Exercises: \\n"
      for (var k = 0; k < SearchResults.final[i].exercises.length; k++) {
        viewButtonString += "Exercise " + (k + 1) + ": " + SearchResults.final[i].exercises[k].title + "\\n"
      }

      viewButtonString += "\')\">View details</button>";
      currentString += viewButtonString + '<hr>';
      res.write(currentString);
    }
    res.status(200).send();
  }
  catch (err) {
    if (err instanceof DomainError) {
      res.status(err.code).json({ code: err.code, message: err.message })
    } else {
      res.status(500).json({ code: 401, message: "Username or id incorrect" });
    }
  }

})

instructorRouter.get('/filter', async (req, res) => {
  try {
    const username = req.query.username;
    const subject = req.query.subject;
    const userId = req.query.userId;
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;

    const { type } = await Account.findOne({ _id: userId }, { type: 1 });
    if (type != 'INSTRUCTOR') {
      throw new DomainError("unauthorized user: not an instructor", 401);
    }


    const FilterResult = await
      instructorController.getFilterResult({ username, userId, subject, minPrice, maxPrice });
    res.write('<h1>Filter results</h1> <hr>')
    let currentString = " ";
    let viewButtonString;
    for (var i = 0; i < FilterResult.final2.length; i++) {
      viewButtonString = "";
      currentString = '<p> Course title: ' + FilterResult.final2[i].title + '<br>' +
        'Total hours: ' + FilterResult.final2[i].totalHours + '<br>' +
        'Rating: ' + FilterResult.final2[i].rating + '<br>' +
        'Price: ' + FilterResult.final2[i].price + " " + FilterResult.currency + '<br>' +
        'Summary: ' + FilterResult.final2[i].summary + '<br>' +
        '</p> <hr>';
      viewButtonString += "<button onclick=\"alert(\'Course Details: \\nSubtitles: \\n"

      for (var j = 0; j < FilterResult.final2[i].subtitles.length; j++) {
        viewButtonString += "Subtitle " + (j + 1) + ": " + FilterResult.final2[i].subtitles[j].text + ", total hours: " + FilterResult.final2[i].subtitles[j].hours +
          ", Video Title: " + FilterResult.final2[i].subtitles[j].videoTitles.title + "\\n"
      }

      viewButtonString += "Exercises: \\n"
      for (var k = 0; k < FilterResult.final2[i].exercises.length; k++) {
        viewButtonString += "Exercise " + (k + 1) + ": " + FilterResult.final2[i].exercises[k].title + "\\n"
      }

      viewButtonString += "\')\">View details</button>";
      currentString += viewButtonString + '<hr>';
      res.write(currentString);
    }

    res.status(200).send();
  }

  catch (err) {
    if (err instanceof DomainError) {
      res.status(err.code).json({ code: err.code, message: err.message })
    } else {
      res.status(500).json({ code: 401, message: "Username or id incorrect" });
    }
  }

})


instructorRouter.post('/createcourse', async (req, res) => {
  try {

    const { instructorId, subject, title, price, summary, subtitles, exercises } = req.body;

    const { type } = await Account.findOne({ _id: instructorId }, { type: 1 });
    if (type != 'INSTRUCTOR') {
      throw new DomainError("unauthorized user: not an instructor", 401);
    }



    const CreateResults = await
      instructorController.createcourse({ instructorId, subject, title, price, summary, subtitles, exercises });
    //CreateResults.save();
    res.write('<h1> course created successfully</h1>');
    res.status(200).send();

  }
  catch (err) {
    if (err instanceof DomainError) {
      res.status(err.code).json({ code: err.code, message: err.message })
    } else {
      res.status(500).json({ err });
    }
  }
})

instructorRouter.put('/changePassword',async(req,res) => {
  try{
  const userId = req.body.userId;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
    await instructorController.changePassword({ userId, oldPassword, newPassword });
    res.status(200).json("Update Succesfully");}
    catch (err) {
      if (err instanceof DomainError) {
        res.status(err.code).json({ code: err.code, message: err.message })
      } else {
        res.status(500).json({ err });
      }}

})

instructorRouter.put('/editEmail', async (req, res) => {
  try {
    const userId = req.body.userId;
    const oldEmail = req.body.oldEmail;
    const newEmail = req.body.newEmail;
    await instructorController.editEmail({ userId, oldEmail, newEmail });
    res.status(200).json("Update Succesfully");
  }
  catch (err) {
    if (err instanceof DomainError) {
      res.status(err.code).json({ code: err.code, message: err.message })
    } else {
      res.status(500).json({ err });
    }
  }

})

instructorRouter.put('/editBiography', async (req, res) => {
  try {
    const userId = req.body.userId;
    const newText = req.body.newText;
    await instructorController.editBiography({ userId, newText });
    res.status(200).json("Update Succesfully");
  }
  catch (err) {
    if (err instanceof DomainError) {
      res.status(err.code).json({ code: err.code, message: err.message })
    } else {
      res.status(500).json({ err });
    }
  }

})

instructorRouter.put('/addDiscount', async (req, res) => {
  try {
    const courseId = req.body.courseId;
    const discount = req.body.discount;
    const discountDuration = req.body.discountDuration;

    await instructorController.addDiscount({ courseId, discount, discountDuration });
    res.status(200).json("Update Succesfully");
  }
  catch (err) {
    if (err instanceof DomainError) {
      res.status(err.code).json({ code: err.code, message: err.message })
    } else {
      res.status(500).json({ err });
    }
  }



})

instructorRouter.get('/instructor/:id', async (req, res) => {
  //gets the instructor's details, to be used later on in the frontend page.
  try {
    const userId = req.params.id;
    const instructor = await instructorController.getInstructorData({ userId });
    res.status(200).json(instructor);
  } catch (error) {
    res.status(error.code).json({ message: error.message });

  }
})

instructorRouter.put('/rateInstructor',async(req,res) => {
  try{
const {instructorId,userId, ratingNumber, ratingText}= req.query
  await instructorController.rateInstructor(instructorId,userId, ratingNumber, ratingText)
  res.status(200).json({Done: true});
  }
  catch(err){
    if (err instanceof DomainError) {
      res.status(err.code).json({message: err.message})
    } else {
      res.status(500).json({ err });
    }
  }
})

instructorRouter.post('/addQuestion2',async(req,res) => {
  try{
const questionText=req.body.questionText
const mcq1=req.body.mcq1
const mcq2=req.body.mcq2
const mcq3=req.body.mcq3
const mcq4=req.body.mcq4
const correctAnswer=req.body.correctAnswer
const totalCredit=req.body.totalCredit
  const result= await instructorController.addQuestion2({questionText, mcq1,mcq2,mcq3,mcq4, correctAnswer, totalCredit})
  res.status(200).json("Question Created Successfully");
  }
  catch(err){
    if (err instanceof DomainError) {
      res.status(err.code).send(err.message)
    } else {
      res.status(500).send({ err });
    }
  }
})

instructorRouter.post('/createExercise',async(req,res) => {
  try{
const courseId=req.body.courseId
const subtitleId=req.body.subtitleId
const title=req.body.title
console.log("courseid",courseId)
console.log("subtitleid",subtitleId)
console.log("title",title)


  await instructorController.createExercise({courseId,subtitleId, title})
  res.status(200).json("Exercise Created Successfully");
  }
  catch(err){
    if (err instanceof DomainError) {
      res.status(err.code).send(err.message)
    } else {
      res.status(500).send({ err });
    }
  }
})

instructorRouter.post('/addVideo',async(req,res) => {
  try{
   

const subtitleId=req.body.subtitleId
const title=req.body.title
const link=req.body.link
const description=req.body.description



  await instructorController.addVideo({ subtitleId, title, link, description})
  
  res.status(200).json("Video Added Successfully");
  }
  catch(err){
    if (err instanceof DomainError) {
      res.status(err.code).send(err.message)
    } else {
      res.status(500).send({ err });
    }
  }
})

instructorRouter.post('/addVideoCourse',async(req,res) => {
  try{
   console.log("111");

const courseId=req.body.courseId
const videoLink=req.body.videoLink
console.log("1")

console.log(courseId)

  await instructorController.addVideoCourse({ courseId,videoLink})
  console.log("henaaa")
  res.status(200).json("Video Added Successfully");
  }
  catch(err){
    if (err instanceof DomainError) {
      res.status(err.code).send(err.message)
    } else {
      res.status(500).send({ err });
    }
  }
})

instructorRouter.post('/acceptContract',async(req,res) => {
  try{
const userId=req.body.userId
console.log(userId)


  await instructorController.acceptContract({ userId})
  
  res.status(200).json("Thank you for accepting");
  }
  catch(err){
    if (err instanceof DomainError) {
      res.status(err.code).send(err.message)
    } else {
      res.status(500).send({ err });
    }
  }
})

 

module.exports = instructorRouter;