const express = require("express");
const instructorController = require("../controllers/instructorController");
const instructorRouter = new express.Router();
const DomainError = require('../error/domainError');
const path = require('path')
instructorRouter.get('/', async (req,res) => {
  res.sendFile(path.resolve('views/instructorGeneral.html'))
})
instructorRouter.get('/createCo', async (req, res) => {
  
  res.sendFile(path.resolve('views/createCourseInst.html'));
  
})




instructorRouter.get('/view', async (req, res) => {
    try{
    const username = req.query.username;
    console.log(username);
    // if (userType != 'Instructor') {
    //     res.status(401).json({ message: "unauthorized user." });
    // }



    const viewResults = await
        instructorController.getViewResult({ username });
    

    res.status(200).json(viewResults); 
    }
    catch(err){
        if (err instanceof DomainError ){
           res.status(err.code).json({code:err.code, message:err.message})
         }else{
           res.status(500).json({err});}
             }

})

instructorRouter.get('/viewPage', async (req, res) => {
  res.sendFile(path.resolve('views/viewCoursesInst.html'));
})

instructorRouter.get('/SearchInst', async (req, res) => {
    try{
    const username = req.query.username;
     const search = req.query.search;
     const userId = req.query.userId;
 

    const SearchResults = await
        instructorController.getSearchResult({ username, search, userId });
    res.write('<h1>Search results</h1> <hr>')
    let currentString;
    for (var i=0; i<SearchResults.length; i++) {
          currentString = '<p> Course title: ' + SearchResults[i].title + '<br>' +
          'Total hours: ' + SearchResults[i].totalHours +'<br>' +
          'Rating: '+ SearchResults[i].rating+'<br>' +
          'Price: '+ SearchResults[i].price+'<br>'+
          'Summary: '+ SearchResults[i].summary+'<br>'
          'Subtitles: '+ SearchResults[i].subtitles+'<br>'+
          'Exercises: '+ SearchResults[i].exercises+'<br>'
          '</p> <hr>';
      res.write(currentString);
      }
    res.status(200).send();
    //res.status(200).json({ result: SearchResults });
  }
    catch(err){
        if (err instanceof DomainError ){
           res.status(err.code).json({code:err.code, message:err.message})
         }else{
           res.status(500).json({err});}
             }

})

instructorRouter.get('/filter', async (req, res) => {
    try{
    const username = req.query.username;
    const subject = req.query.subject;
    const userId = req.query.userId;
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const FilterResult = await
        instructorController.getFilterResult({ username, userId , subject , minPrice , maxPrice });
    res.write('<h1>Filter results</h1> <hr>')
    let currentString;
    for (var i=0; i<FilterResult.length; i++) {
              currentString = '<p> Course title: ' + FilterResult[i].title + '<br>' +
              'Total hours: ' + FilterResult[i].totalHours +'<br>' +
              'Rating: '+ FilterResult[i].rating+'<br>' +
              'Price: '+ FilterResult[i].price+'<br>'+
              'Summary: '+ FilterResult[i].summary+'<br>'
              'Subtitles: '+ FilterResult[i].subtitles+'<br>'+
              'Exercises: '+ FilterResult[i].exercises+'<br>'
              '</p> <hr>';
          res.write(currentString);
          }
        res.status(200).send();
   }

    catch(err){
        if (err instanceof DomainError ){
           res.status(err.code).json({code:err.code, message:err.message})
         }else{
           res.status(500).json({err});}
             }

})



//Do we need this....
instructorRouter.post('/createcourse', async (req, res) => {
  try{
   
    const {instructorId,subject,title,price,summary,subtitles}= req.body;

//subtitels = [{text,hours}]
  console.log(instructorId,subject,title,price,summary,subtitles);
const CreateResults = await
  instructorController.createcourse({ instructorId, subject , title, price , summary , subtitles});
 //CreateResults.save();
  res.write('<h1> course created successfully</h1>');
  res.status(200).send();
  
  }
  catch(err){
      if (err instanceof DomainError ){
          res.status(err.code).json({code:err.code, message:err.message})
        }else{
          res.status(500).json({err});}

  }


})
 

module.exports = instructorRouter;