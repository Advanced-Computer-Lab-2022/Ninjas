const express = require("express");
const userController = require("../controllers/userController");
const userRouter = new express.Router();
const path = require('path');
const DomainError = require("../error/domainError");
const { Course } = require("../models/courses");
const { Exercise } = require("../models/exercise");
const { question, questionSchema } = require("../models/question");
const { Account } = require("../models/account");
const { sessionDetails } = require("../middleware/authMiddleware");

userRouter.post('/logout', (req, res) => {
    console.log(req.session.id);
    const session = sessionDetails.getSession(req.session.id);

    const { userId, username } = session
    //kill the JWT cookie
    const key = username + 'jwt';
    res.clearCookie(key);
    //remove all the local user sessions
    sessionDetails.killUserSessions(userId);
    res.status(200).json({ message: "logged out successfully" });

})

userRouter.get('/search', async (req, res) => {
    try {
         const {
             userId, subject, minPrice, maxPrice, rating, title, instructor, totalHours
         } = req.query;
       // console.log(req.query.userId)
       // console.log(JSON.parse(req.query))

        const searchResults = await
            userController.getSearchResult({ userId, subject, minPrice, maxPrice, rating, title, instructor, totalHours });
     //console.log(searchResults);                                                                        
            res.status(200).json({ data: searchResults });
    } catch (error) {
        console.log(error)
        res.status(error.code).json({ message: error.message });
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

userRouter.post('/selectCountry', async (req, res) => {
    try {
        const session = sessionDetails.getSession(req.session.id);
        const { userId, type } = session;
        const selectedCountry = req.body.country;
        if (!selectedCountry || !userId) {
            return res.status(400).json({ message: "please provide the userID and the selected country." });
        }

        await userController.changeUserCountry({ userId, type, selectedCountry });
        // status 201 "no_content" is usually rendered when the response does not have any data in it,
        // and is commonly used in cases where a record is updated.
        res.status(201).json({ message: "your country has been changed successfully." });
    } catch (error) {
        res.status(error.code).json({ message: error.message });
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
        res.status(error.code).json({ message: error.message });
    }
})

userRouter.get('/userBySession', async (req,res) => {
    try {
        const { userId } = sessionDetails.getSession(req.session.id);
        const user = await userController.getUserData({ userId });
        res.status(200).json(user);
    } catch (error) {
        res.status(error.code).json({ message: error.message });
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
    try {
        const { exersiseId, userId } = req.query
        const grade = await userController.viewExersiseGrade(exersiseId, userId);
        res.status(200).json(grade)
    }
    catch (err) {

        if (err instanceof DomainError) {
            res.status(err.code).json({ message: err.message })
        } else {
            res.status(500).json({ err });
        }
    }
})


userRouter.get('/viewCorrectAnswers', async (req, res) => {
    try {

        const { exersiseId, subtitleId, courseId } = req.query
        const exersise = await userController.viewCorrectAnswers(exersiseId, subtitleId, courseId)
        res.status(200).json(exersise)




    } catch (err) {
        if (err instanceof DomainError) {
            res.status(err.code).json({ message: err.message })
        } else {
            res.status(500).json({ err });
        }
    }
})




userRouter.get('/viewVideo', async (req, res) => {
    try {
        const session = sessionDetails.getSession(req.session.id);
        const { userId } = session;

        const { courseId, subtitleId } = req.query
        const exersise = await userController.viewVideo(courseId, subtitleId, userId)
        res.status(200).json(exersise)

    } catch (err) {
        console.log(err)
        if (err instanceof DomainError) {
            res.status(err.code).json({ message: err.message })
        } else {
            res.status(500).json({ err });
        }
    }
})

userRouter.get('/viewEnrolledCourses', async (req, res) => {
    try {
        const session = sessionDetails.getSession(req.session.id);
        const userId = session.userId;

        const results = await userController.viewEnrolledCourses({userId})
        res.status(200).json(results)




    } catch (err) {
        console.log(err)
        if (err instanceof DomainError) {
            res.status(err.code).json({ message: err.message })
        } else {
            res.status(500).json({ err });
        }
    }
})

userRouter.post('/payForCourse', async (req, res) => {
    try {

        const userId = req.body.userId
        const courseId = req.body.courseId
        await userController.payForCourse(userId, courseId)
        res.status(200).json("You have paid successfully");
    }
    catch (err) {
        if (err instanceof DomainError) {
            res.status(err.code).send(err.message)
        } else {
            res.status(500).send({ err });
        }
    }

})

userRouter.post('/payForCourse2', async (req, res) => {
    try {

        const userId = req.body.userId
        const courseId = req.body.courseId
        const cardNo = req.body.cardNo
        const country = req.body.country
        await userController.payForCourse2(userId, courseId, couresId, cardNo, country)
        res.status(200).json("You have paid successfully");
    }
  catch(err){
        if (err instanceof DomainError) {
            res.status(err.code).send(err.message)
        } else {
            res.status(500).send({ err });
        }
    }

})

userRouter.get('/viewWallet', async (req, res) => {
    try {

        const session = sessionDetails.getSession(req.session.id);
        const userId = session.userId;
        console.log(userId);
        const results = await userController.viewWallet({userId})
        res.status(200).json(results)

    } catch (err) {
        console.log(err)
        if (err instanceof DomainError) {
            res.status(err.code).json({ message: err.message })
        } else {
            res.status(500).json({ err });
        }
    }
})







userRouter.post('/acceptPolicy',async(req,res) => {
    try{
        const session = sessionDetails.getSession(req.session.id);
        const userId = session.userId
await userController.acceptPolicy({ userId})

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

  userRouter.get('/viewProgress',async(req,res) => {
    try{
        const session = sessionDetails.getSession(req.session.id);
        const userId = session.userId
  const courseId=req.query.courseId
const progress= await userController.viewProgress({ userId,courseId})
        console.log(progress)

        res.status(200).json();
    }
    catch(err){
        if (err instanceof DomainError) {
            res.status(err.code).send(err.message)
        } else {
            res.status(500).send({ err });
        }
    }
})
module.exports = userRouter;

userRouter.post('/requestRefund',async(req,res) => {
    try{
        const session = sessionDetails.getSession(req.session.id);
        const userId = session.userId
  const courseId=req.query.courseId
    await userController.requestRefund({ userId,courseId})


    res.status(200).json("Request is waiting for review");}

    catch(err){
        if (err instanceof DomainError) {
            res.status(err.code).send(err.message)
        } else {
            res.status(500).send({ err });
        }
    }
})

userRouter.get('/mostPopularCourses', async (req, res) => {
    try { //get the user type from the session
        const session = sessionDetails.getSession(req.session.id);
        const { type } = session;

        //admins should not access the endpoint
        if (type == 'ADMIN')
            return res.status(401).json({ message: "Unauthorized user." });

        const courses = await userController.mostPopularCourses();
        res.status(200).json(courses);

    } catch (error) {
        console.log(error)
        res.status(error.code).json({ message: error.message });
    }
})

userRouter.get('/course/:id', async (req, res) => {
    try {
        const session = sessionDetails.getSession(req.session.id);
        const courseId = req.params.id;
        const { userId, type: userType } = session;

        const course = await userController.getCourse({ courseId, userType, userId });
        res.status(200).json(course);
    } catch (error) {
        console.log(error)
        res.status(error.code).json({ message: error.message });
    }
})

userRouter.get('/currentUser', async (req, res) => {
    try {
        //gets the user details of the current user (using the session) and sends it to the frontend to deal with it
        const session = sessionDetails.getSession(req.session.id);
        const { userId } = session;
        const user = await userController.getUserData({ userId });
        res.status(200).json(user);
    } catch(error) {
        res.status(error.code).json({message: error.message});
    }

})

userRouter.post('/requestAccess', async (req,res) => {
    try {
        const { userId, courseId } = req.query;
        const response = await userController.requestAccess(userId, courseId);
        if (response == "Done")
        res.status(200).json({ message: "Your access request has been sent to the admin"});
    } catch(error) {
        res.status(error.code).json({ message: error.message });
    }
})

userRouter.get('/checkRequestedAccess', async (req,res) => {
    try {
    const { userId, courseId } = req.query;
    const requested = await userController.checkRequestedAccess({ userId, courseId });
    res.status(200).json(requested);
    } catch(error) {
        res.status(error.code).json({ message: error.message });
    }
})

userRouter.get('/requestedTheRefund', async (req,res) => {
    try {
        const { userId, courseId } = req.query;
        const result = await userController.checkRequestedRefund({ userId, courseId });

        res.status(200).json(result);
    } catch(error) {
        res.status(error.code).json({ message: error.message });
    }
})
module.exports = userRouter;
