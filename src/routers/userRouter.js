const express = require("express");
const userController = require("../controllers/userController");
const userRouter = new express.Router();
const path = require('path');
const DomainError = require("../error/domainError");
const { Course } = require("../models/courses");
const { Exercise } = require("../models/exercise");
const { question, questionSchema } = require("../models/question");
const { Account } = require("../models/account");

userRouter.get('/', (req, res) => {
    // here we are telling the response to find the html file and send it as a response
    res.sendFile(path.resolve('views/homePage.html'));
});
userRouter.get('/viewGuestIndividualTrainee', (req, res) => {
    res.sendFile(path.resolve('views/guestIndividualHome.html'));
});
userRouter.get('/viewInstructorHomePage', (req, res) => {
    res.sendFile(path.resolve('views/instructorGeneral.html'));
});
userRouter.get('/viewCourseWithoutPrice', (req, res) => {
    res.sendFile(path.resolve('views/viewCourseNoPrice.html'));
});
userRouter.get('/viewCorporateTrainee', (req, res) => {
    res.sendFile(path.resolve('views/corporateTrainee.html'));
});
userRouter.get('/viewCoursesWithPricePage', (req, res) => {
    res.sendFile(path.resolve('views/viewCoursesWithPrice.html'));
});

userRouter.get('/search', async (req, res) => {
    try {
        // const {
        //     userId, subject, minPrice, maxPrice, rating, title, instructor, totalHours
        // } = req.query;
        console.log(req.query.userId)
        console.log(JSON.parse(req.query))

        const searchResults = await
            userController.getSearchResult({ userId, subject, minPrice, maxPrice, rating, title, instructor, totalHours });
        res.status(200).json({ result: searchResults });
    } catch (error) {
        console.log(error)
        res.status(error.code).json(error.message);
    }
})

userRouter.get('/viewAllCourses', async (req, res) => {
    try {
        const {
            userId, subject, rating, title, instructor, totalHours
        } = req.query;

        const { type } = await Account.findOne({ _id: userId }, { type: 1 }).catch((err) => { throw new DomainError("you are not autherized", 401) });
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
                    viewButtonString += "Subtitle " + (j + 1) + ": " + courses[i].subtitles[j].text + ", total hours: " + courses[i].subtitles[j].hours
                        + ", video title: " + courses[i].subtitles[j].videoTitles.title + "\\n"
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
        console.log(viewButtonString)
        res.status(200).send();
    } catch (err) {
        res.status(err.code).send(err.message);
    }

})

userRouter.post('/selectCountry/:id', async (req, res) => {
    try {
        const userId = req.params.id
        const selectedCountry = req.body.country;
        if (!selectedCountry || !userId) {
            return res.status(400).json({ message: "please provide the userID and the selected country." });
        }

        await userController.changeUserCountry({ userId, selectedCountry });
        // status 201 "no_content" is usually rendered when the response does not have any data in it,
        // and is commonly used in cases where a record is updated.
        res.status(201).json({ message: "your country has been changed successfully." });
    } catch (error) {
        res.status(error.code).json(error.message);
    }
})
userRouter.get('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(400).json({ message: "please provide the userID." });
        }
        const user = await userController.getUserData({ userId });
        res.status(200).json(user);
    } catch (error) {
        res.status(error.code).json(error.message);
    }
})



userRouter.get('/viewAndFilterCourses', async (req, res) => {
    try {

        const {
            userId, subject, minPrice, maxPrice, rating, title, instructor, totalHours
        } = req.query;

        const { type } = await Account.findOne({ _id: userId }, { type: 1 }).catch((err) => { throw new DomainError("you are not autherized", 401) });

        if (type == 'ADMIN' || type == 'CORPORATE_TRAINEE') {
            throw new DomainError("you are not autherized", 401)
        }


        const searchResults = await
            userController.getSearchResult({ userId, subject, minPrice, maxPrice, rating, title, instructor, totalHours });

        let currentString = "";
        let viewButtonString;

        for (var i = 0; i < searchResults.courses.length; i++) {
            viewButtonString = "";
            currentString = '<p> Course title: ' + searchResults.courses[i].title + '<br>' +
                'Total hours: ' + searchResults.courses[i].totalHours + '<br>' +
                'Rating: ' + searchResults.courses[i].rating + '<br>' +
                'Price: ' + searchResults.courses[i].price + ' ' + searchResults.currency + '<br>' +
                'Subject: ' + searchResults.courses[i].subject + '<br>' +
                'instructor: ' + searchResults.courses[i].instructors[0].firstName + " " +
                searchResults.courses[i].instructors[0].lastName + '<br>' +
                '</p> <hr>';
            viewButtonString += "<button onclick=\"alert(\'Course Details: \\nSubtitles: \\n"

            for (var j = 0; j < searchResults.courses[i].subtitles.length; j++) {
                console.log(searchResults.courses[i].subtitles[j])
                viewButtonString += "Subtitle " + (j + 1) + ": " + searchResults.courses[i].subtitles[j].text + ", total hours: " + searchResults.courses[i].subtitles[j].hours
                    + ", video title: " + searchResults.courses[i].subtitles[j].videoTitles.title + "\\n"
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
    catch (err) {
        if (err instanceof DomainError) {
            res.status(err.code).send(err.message)
        } else {
            res.status(500).send({ err });
        }
    }

})

userRouter.get('/viewFilterCourses', (req, res) => {
    res.sendFile(path.resolve('views/viewCoursesWithPrice.html'))
})

userRouter.get('/viewAllCoursesPage', (req, res) => {
    res.sendFile(path.resolve('views/viewCourseNoPrice.html'));
})

userRouter.post('/forgotPassword', async (req, res) => {
    //if we will use react frontend, we will only need the username or the userId.
    //assuming that the user clicks "forgot my password" then we ask them for their username,
    //we will fetch the database to get the user type, email, etc.

    try {
        //get the username from the request
        const username = req.body.username;
        if (username == null || username.trim().length === 0) {
            //this means that the username is either not entered
            //or it was just a string of white spaces -- the trim method figures this out.
            return res.status(400).json({ message: "Please enter your username." });
        }
        await userController.forgotMyPassword({ username });

        //if the email is sent successfully, we will tell the frontend to display the message.
        res.status(200).json({ message: "A reset password email has been sent. Please check your email. " });
    } catch (error) {
        res.status(error.code).json(error);
    }
})

userRouter.post('/rateCourse', async (req, res) => {
    try {
        const { userId, courseId } = req.query;
        const {
            rating,
            text
        } = req.body;
        if (userId == "" || courseId == "" || rating == "") {
            //maybe we should default the nullified rating to a zero? I don't know..
            return res.status(400).json({ message: "please provide all of the following: the userID and the courseID and the rating" });
        }

        await userController.rateCourse({ userId, courseId, rating, text });

        res.status(200).json({ message: "your rating was submitted successfully." })
    } catch (error) {
        res.status(error.code).json({ message: error.message });
    }
})

userRouter.get('/solveExercise', async (req, res) => {
    try {
        const { userId, exerciseId, courseId, subtitleId } = req.query;

        if (userId == "" || exerciseId == "") {
            return res.status(400).json({ message: "please provide all of the following: the userID and the exerciseID" });
        }

        //this should return the exercise object to the frontend to display it
        const exercise = await userController.solveExercise({ userId, exerciseId, courseId, subtitleId });
        res.status(200).json(exercise);

    } catch (error) {
        res.status(error.code).json({ message: error.message });
    }

})

userRouter.post('/submitExercise', async (req, res) => {
    try {
        const { userId, subtitleId } = req.query;

        //get the solved exercise object from the FE, may be modified later.
        const { solvedExercise } = req.body;
        if (userId == "" || solvedExercise == "") {
            return res.status(400).json({ message: "please provide all of the following: the userID and the solved exercise" });
        }

        const { userGrade, gradePercentage } = await userController.submitExercise({ userId, subtitleId, solvedExercise });
        res.status(200).json({
            message: "your exercise has been submitted",
            userGrade,
            gradePercentage
        });
    } catch (error) {
        res.status(error.code).json({ message: error.message });
    }
})


userRouter.get('/viewExerciseGrade', async (req, res) => {
 try{  const {exersiseId,userId}= req.query
    const grade = await userController.viewExersiseGrade(exersiseId,userId);
    res.status(200).json(grade)
 }
 catch(err){

    if (err instanceof DomainError) {
        res.status(err.code).json({ message: err.message })
      } else {
        res.status(500).json({ err });
      }
 }
})


userRouter.get('/viewCorrectAnswers', async (req, res) => {
  try{

          const{exersiseId,subtitleId,courseId}=req.query
        const exersise= await userController.viewCorrectAnswers (exersiseId,subtitleId,courseId)
        res.status(200).json(exersise)




    }catch(err){
        if (err instanceof DomainError) {
            res.status(err.code).json({message: err.message})
          } else {
            res.status(500).json({ err });
          }
    }
})




userRouter.get('/viewVideo', async (req, res) => {
    try{
  
            const{courseId,subtitleId}=req.query
          const exersise= await userController.viewVideo(courseId,subtitleId)
          res.status(200).json(exersise)
  
  
  
  
      }catch(err){
        console.log(err)
          if (err instanceof DomainError) {
              res.status(err.code).json({message: err.message})
            } else {
              res.status(500).json({ err });
            }
      }
  })
module.exports = userRouter;
