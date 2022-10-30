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



instructorRouter.get('/view', async (req, res) => {
  try {


    const username = req.query.username;


    const { type } = await Account.findOne({ "username": req.query.username }, { type: 1 });
    if (type != 'INSTRUCTOR') {
      throw new DomainError("unauthorized user: not an instructor", 401);
    }




    const viewResults = await
      instructorController.getViewResult({ username });

    res.write('<h1>Search results</h1> <hr>')
    let currentString = "";
    let viewButtonString;
    for (var i = 0; i < viewResults.length; i++) {
      viewButtonString = "";
      currentString = '<p> Course title: ' + viewResults[i].title + '<br>'
      '</p> <hr>';
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
    }

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

instructorRouter.get('/viewPage', async (req, res) => {
  res.sendFile(path.resolve('views/viewCoursesInst.html'));
})
instructorRouter.get('/createCo', async (req, res) => {

  res.sendFile(path.resolve('views/createCourseInst.html'));

})

instructorRouter.get('/selectCountry', async (req, res) => {

  res.sendFile(path.resolve('views/selectCountry.html'));

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
      res.status(500).json({ err });
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
      res.status(500).json({ err });
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


module.exports = instructorRouter;