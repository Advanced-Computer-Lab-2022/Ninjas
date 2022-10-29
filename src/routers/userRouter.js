const express = require("express");
const userController = require("../controllers/userController");
const userRouter = new express.Router();
const path = require('path');
const DomainError = require("../error/domainError");
const { Course } = require("../models/courses");
const { Exercise } = require("../models/exercise");
const question = require("../models/question");
const { Account } = require("../models/account");

userRouter.get('/', (req, res) => {
    // here we are telling the response to find the html file and send it as a response
    res.sendFile(path.resolve('views/homePage.html'));
});
userRouter.get('/selectCountryPage', (req,res) => {
    res.sendFile(path.resolve('views/selectCountry.html'));
});
userRouter.get('/viewGuestIndividualTrainee', (req,res) => {
    res.sendFile(path.resolve('views/guestIndividualHome.html'));
});
userRouter.get('/viewInstructorHomePage', (req,res) => {
    res.sendFile(path.resolve('views/instructorGeneral.html'));
});
userRouter.get('/viewCourseWithoutPrice', (req,res) => {
    res.sendFile(path.resolve('views/viewCourseNoPrice.html'));
});
userRouter.get('/viewCorporateTrainee', (req,res) => {
    res.sendFile(path.resolve('views/corporateTrainee.html'));
});
userRouter.get('/viewCoursesWithPricePage', (req,res) => {
    res.sendFile(path.resolve('views/viewCoursesWithPrice.html'));
});

userRouter.get('/search', async (req, res) => {
    const {
        userId, subject, minPrice, maxPrice, rating, title, instructor, totalHours
    } = req.body;

    //snipped can be moved to controller



    if (userType == 'ADMIN' || !userType) {
        res.status(401).json({ message: "unauthorized user." });
    }

    const searchResults = await
        userController.getSearchResult({ userId, subject, minPrice, maxPrice, rating, title, instructor, totalHours });
    res.status(200).json({ result: searchResults });
})

userRouter.get('/viewAllCourses', async (req, res) => {
    try {
        const {
            userId, subject, rating, title, instructor, totalHours
        } = req.query;

        const { type } = await Account.findOne({ _id: userId }, { type: 1 });
        if (type == 'ADMIN') {
            throw new DomainError("unauthorized user: admin", 401);
        }
        //should return only the title, total hours, and rating
        const { courses } = await userController.getSearchResult({ userId, subject, rating, title, instructor, totalHours, minPrice: "null", maxPrice: "null" }); //gets all courses
        res.write('<h1>Search results</h1> <hr>')
        let currentString; //this will be modified to be written in the response
        let viewButtonString;

        for (var i = 0; i < courses.length; i++) {

            viewButtonString = "";
            currentString = '<p> Course title: ' + courses[i].title + '<br>' +
                'Total hours: ' + courses[i].totalHours + '<br>' +
                'Rating: ' + courses[i].rating + '<br>' +
                'Subject: ' + courses[i].subject + '<br>' +
                'instructor: ' + courses[i].instructors[0].firstName + " " +
                courses[i].instructors[0].lastName + '<br>' +
                '</p> <hr>';
            if (type != 'CORPORATE_TRAINEE') {
            viewButtonString += "<button onclick=\"alert(\'Course Details: \\nSubtitles: \\n"

            for (var j = 0; j < courses[i].subtitles.length; j++) {
                viewButtonString += "Subtitle " + (j + 1) + ": " + courses[i].subtitles[j].text + ", total hours: " + courses[i].subtitles[j].hours + "\\n"
            }

            viewButtonString += "Exercises: \\n"
            for (var k = 0; k < courses[i].exercises.length; k++) {
                viewButtonString += "Exercise " + (k + 1) + ": " + courses[i].exercises[k].title + "\\n"
            }

            viewButtonString += "\')\">View details</button>";
        }
            currentString += viewButtonString + '<hr>'
            res.write(currentString);
        }
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(err.code).send(err.message);
    }

})

userRouter.post('/selectCountry', async (req,res) => {
    try {
    const { userId, selectedCountry } = req.body;
    if (!selectedCountry || !userId) {
        res.status(400).send('<h1>Please enter a country AND a user ID.</h1>')
    }

    await userController.changeUserCountry({ userId, selectedCountry });
    // status 201 "no_content" is usually rendered when the response does not have any data in it,
    // and is commonly used in cases where a record is updated.
    res.write('<h1> Country changed successfully </h1>')
    res.write('<p>your country is now '+ selectedCountry + '</p>')
    res.status(201).send();
} catch (error) {
    res.status(error.code).send(error.message);
}
})



userRouter.get('/viewAndFilterCourses', async (req, res) => {
   try{ 
   
    const {
        userId, subject, minPrice, maxPrice, rating, title, instructor, totalHours
    } = req.query;

   

    const searchResults = await
        userController.getSearchResult({ userId, subject, minPrice, maxPrice, rating, title, instructor, totalHours });

        let currentString="";
        let viewButtonString;
        
        for (var i=0; i<searchResults.courses.length; i++) {
            viewButtonString = "";
            currentString = '<p> Course title: ' + searchResults.courses[i].title + '<br>' +
            'Total hours: ' + searchResults.courses[i].totalHours +'<br>' +
            'Rating: '+ searchResults.courses[i].rating+'<br>' +
             'Price: '+ searchResults.courses[i].price+' '+searchResults.currency+'<br>' +
             'Subject: '+ searchResults.courses[i].subject+'<br>' +
            'instructor: '+ searchResults.courses[i].instructors[0].firstName +" "+
            searchResults.courses[i].instructors[0].lastName+'<br>' +
            '</p> <hr>';
            viewButtonString += "<button onclick=\"alert(\'Course Details: \\nSubtitles: \\n"

            for (var j = 0; j < searchResults.courses[i].subtitles.length; j++) {
                viewButtonString += "Subtitle " + (j + 1) + ": " + searchResults.courses[i].subtitles[j].text + ", total hours: " + searchResults.courses[i].subtitles[j].hours + "\\n"
            }

            viewButtonString += "Exercises: \\n"
            for (var k = 0; k < searchResults.courses[i].exercises.length; k++) {
                viewButtonString += "Exercise " + (k + 1) + ": " + searchResults.courses[i].exercises[k].title + "\\n"
            }

            viewButtonString += "\')\">View details</button>";
            currentString += viewButtonString + '<hr>'
       
            res.write(currentString);
        }
       
        res.status(200).send();
}
catch(err){
    console.log(err);
    if (err instanceof DomainError ){
        res.status(err.code).send( err.message)
      }else{
        res.status(500).send({err});}
          }

})

userRouter.get('/viewFilterCourses',(req,res)=>{
    res.sendFile(path.resolve('views/viewCoursesWithPrice.html'))
  })

userRouter.get('/viewAllCoursesPage', (req,res) => {
    res.sendFile(path.resolve('views/viewCourseNoPrice.html'));
})

module.exports = userRouter;
