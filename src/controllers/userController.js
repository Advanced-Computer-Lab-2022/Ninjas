const DomainError = require("../error/domainError");
const { Account } = require("../models/account");
const { Course, countryPriceDetails } = require("../models/courses");
const { Exercise } = require("../models/exercise");
const nodemailer = require("nodemailer");
const { Rating } = require("../models/rating");
const UserExercise = require("../models/userExercise");
const { Subtitle } = require("../models/subtitle");


const helperMethods = {
    updateRatingValue({ reviewsArray, newRating }) {
        var count = reviewsArray.length;
        count++;

        var ratingSum = newRating;
        reviewsArray.forEach(review => {
            ratingSum += review.rating;
        });

        return (ratingSum / count);
    }
}


const userController = {
    async getSearchResult({
        userId = null, subject = null,
        minPrice = null, maxPrice = null,
        rating = null, title = null,
        instructor = null, totalHours = null
    }) {


        try {
            // lw 7d msh mwgod hytl3 null ?? for next sprints
            console.log(userId)
            const user = await Account.findOne({ _id: userId }, { type: 1, country: 1 }).catch(() => {
                throw new DomainError("Wrong Id", 400)
            });
            console.log(user)
            //snipped can be moved to controller
            if (user.type == 'ADMIN' || !user.type) {
                throw new DomainError("Unauthorized user", 401);
            }


            let courses;
            if (subject == "" &&
                rating == "" && title == '' &&
                instructor == '') {
                courses = await Course.find()
            } else {

                let queryArray = [];
                if (subject != "") { queryArray.push({ subject: { '$regex': "" + subject, '$options': 'i' } }) }
                if (rating != "") { queryArray.push({ rating: rating }) }
                if (title != '') { queryArray.push({ title: { '$regex': "" + title, '$options': 'i' } }) }
                if (instructor != '') {
                    queryArray.push({
                        instructors: {
                            $elemMatch: {
                                '$or': [{ firstName: { '$regex': "" + instructor, '$options': 'i' } },
                                { lastName: { '$regex': "" + instructor, '$options': 'i' } }]
                            }
                        }
                    })
                }


                courses = await Course.find({
                    '$and': queryArray
                });
            }

            let details = countryPriceDetails.get(user.country);
            for (var i = 0; i < courses.length; i++) {
                // price = price x factor x discount
                courses[i].price = courses[i].price * details.factor * ((100 - details.discount) / 100);
                if (minPrice != "null" && courses[i].price < minPrice) {
                    courses.splice(i, 1);
                }
                if (maxPrice != "null" && courses[i].price > maxPrice) {
                    courses.splice(i, 1);
                }
            }
            return { courses, currency: details.currency };
        }
        catch (err) {
            if (err instanceof DomainError) { throw err; }
            else {
                console.log(err)
                throw new DomainError('error internally', 500);
            }
        }
    },
    async changeUserCountry({ userId, selectedCountry }) {
        //update the user's record in the database
        try {

            const thisUserType = await Account.findOne({ _id: userId }, { type: 1 }).catch(() => {
                throw new DomainError("Wrong Id", 400)
            });
            //admins should not change their country
            if (thisUserType.type == 'ADMIN')
                throw new DomainError("Unauthorized user: Admin", 401)

            await Account.updateOne(
                { _id: userId }, // gets the user whose id is userId
                { country: selectedCountry } //changes the country to the selected one
            );

        } catch (error) {
            if (error.name == 'ValidationError') {
                const errorMessages = Object.values(error.errors).map(val => val.message);
                throw new DomainError(errorMessages, 400);
            }
            if (error.code == 401) { //unauthorized user
                throw new DomainError("Unauthorized user: Admin", 401)
            }
            else {
                throw new DomainError("internal error", 500);
            }
        }
    },
    async forgotMyPassword({ username }) {
        try {
            //fetch the user type and their email from the database
            const user = await Account.findOne({ username }, { type: 1, email: 1 });

            //if there is no such username
            if (user == null)
                throw new DomainError("This username does not exist.", 400);

            //if the user is not an instructor or a trainee, they are unauthorized.
            if (!['INSTRUCTOR', 'INDIVIDUAL_TRAINEE', 'CORPORATE_TRAINEE'].includes(user.type))
                throw new DomainError("Unauthorized user.", 401);

            // we will use the nodemailer package to send the email from our gmail (ninjasacl) to the user's email.
            const sender = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'aclninjas@gmail.com',
                    pass: 'iftgjpiijzvveprh' //ma3rafsh leh el de7k da bas this is the password that google forces me to use in node JS
                }
            });

            const mailOptions = {
                from: 'aclninjas@gmail.com',
                to: user.email,
                subject: 'Online Learning System: Reset Password',
                text: 'Please follow the link to change your password.' //we should append the link to the change password endpoint
            };

            //the function that sends the email
            await sender.sendMail(mailOptions);
        } catch (error) {
            if (error instanceof DomainError)
                throw error;
            else {
                console.log(error);
                throw new DomainError("internal error", 500);
            }
        }

    },
    async rateCourse({ userId, courseId, rating, text }) {
        try {
            //get the user's name and type from the database
            const user = await Account.findOne({ _id: userId }, { firstName: 1, lastName: 1, type: 1 }).catch(() => {
                throw new DomainError("Wrong Id", 400)
            });

            //if the user is not a trainee then they're unauthorized
            if (!['INDIVIDUAL_TRAINEE', 'CORPORATE_TRAINEE'].includes(user.type))
                throw new DomainError("Unauthorized user.", 401);

            //fetch the course
            const course = await Course.findOne({ _id: courseId }).catch(() => {
                throw new DomainError("Wrong courseId", 400)
            });

            //if there is no such course in the DB
            if (course == null)
                throw new DomainError("Course doesn't exist", 400)

            //create the rating object
            const newReview = await Rating.create({
                firstName: user.firstName,
                lastName: user.lastName,
                rating,
                text
            });

            //update the course rating number
            const updatedCourseRating = helperMethods.updateRatingValue({ reviewsArray: course.reviews, newRating: rating });
            console.log(updatedCourseRating);

            //push the rating into the course reviews array and update the rating field
            await Course.updateOne(
                { _id: courseId },
                {
                    $set: { rating: updatedCourseRating },
                    $push: { reviews: newReview }
                }
            );

        } catch (error) {
            if (error instanceof DomainError)
                throw error;

            else
                throw new DomainError("internal error", 500);
        }
    },
    async solveExercise({ userId, exerciseId, courseId, subtitleId }) {
        try {
            const user = await Account.findOne({ _id: userId }, { type: 1 }).catch(() => {
                throw new DomainError("Wrong Id", 400)
            });

            //if the user is not a trainee then they're unauthorized
            if (!['INDIVIDUAL_TRAINEE', 'CORPORATE_TRAINEE'].includes(user.type))
                throw new DomainError("Unauthorized user.", 401);

            //get the course
            const course = await Course.findOne({ _id: courseId });

            //get the subtitle
            let courseSubtitles = course.subtitles.filter(sub => sub._id.equals(subtitleId));
            //get the exercise
            let exercise = courseSubtitles[0].exercises.filter(ex => ex._id.equals(exerciseId))

            //it will be an array of one element
            return exercise[0];
        } catch (error) {
            if (error instanceof DomainError)
                throw error;
            else
                throw new DomainError("internal error", 500);
        }
    },
    async submitExercise({ userId, solvedExercise }) {
        try {
            //make sure that this user is in the DB
            const user = await Account.findOne({ _id: userId }, { type: 1 }).catch(() => {
                throw new DomainError("Wrong Id", 400)
            });
            console.log(solvedExercise);
            if (user == null)
            throw new DomainError("There is no such user in the database", 400)

            //if the user is not a trainee then they're unauthorized
            if (!['INDIVIDUAL_TRAINEE', 'CORPORATE_TRAINEE'].includes(user.type))
                throw new DomainError("Unauthorized user.", 401);

            //now the solvedExercise should be an exercise object with the user answer present in each question
            const solvedQuestions = solvedExercise.questions;
            let userGrade = 0;
            solvedQuestions.forEach(question => {
                //if the user solved the question correctly, they should get the credit
                if (question.userAnswer != null && (question.userAnswer == question.correctAnswer))
                    userGrade += question.totalCredit;
            })

            const gradePercentage = (userGrade / solvedExercise.totalGrade) * 100;

            await UserExercise.create({
                accountId: userId,
                exercises: [solvedExercise],
                userGrade,
                gradePercentage
            });

            //return the userGrade and the percent to display them in the frontend
            return { userGrade, gradePercentage };

        } catch (error) {
            console.log(error)
            if (error instanceof DomainError)
                throw error;
            else
                throw new DomainError("internal error", 500);
        }
    },
    async getUserData({ userId }) {
        try {
            const user = await Account.findOne({ _id: userId }).catch(() => {
                throw new DomainError("Wrong Id", 400)
            });
            return user;
        }
        catch (error) {
            if (error instanceof DomainError)
                throw error;
            else
                throw new DomainError("internal error", 500);
        }
    },

    async viewExersiseGrade (exersiseId,userId){ // in course//for individul , corp
     try{  
       const grade = await UserExercise.findOne ({
            '$and':[ 
                { accountId: userId},
                { exercises : { $elemMatch: { _id : exersiseId }} }
            ]
        },{ userGrade:1 , gradePercentage: 1, "exercises.totalGrade":1 })

        if (grade){
            
            grade.sovled = true;
            return grade;
        }
        
        
        return {userGrade:0 , gradePercentage: 0, totalGrade : 0, solved: false}
    }
    catch(err){
      
        if (err instanceof DomainError) { throw err; }
        throw new DomainError('error internally', 500);
    }
    },


    async viewCorrectAnswers (exersiseId,subtitleId,courseId){ //3yza ala2y try2a a7san
     try{
         const exersise = await Course.findOne ({
            '$and':[ 
                { _id: courseId},
                { subtitles : { $elemMatch: { "exercises._id" : exersiseId }} },
                { subtitles : { $elemMatch: { _id : subtitleId }}}
            ]
        },{ "subtitles":1 })
        
     if (exersise){
      for (var i =0 ; i < exersise.subtitles.length ; i++){
        if(exersise.subtitles[i].exercises){
        for (var j =0 ; j < exersise.subtitles[i].exercises.length ; j++){
       if (exersise.subtitles[i].exercises[j]._id == exersiseId){
        return {subtitleId: exersise.subtitles[i]._id , exercises : exersise.subtitles[i].exercises[j] }
       }
      }
    }
}
    }
        throw new DomainError('not found exersise',400)

    }catch(err){
        console.log(err);
        if (err instanceof DomainError) { throw err; }
        throw new DomainError('error internally', 500);
    }




    },


    async viewVideo (courseId, subtitleId){ 
        try{
            const video = await Course.findOne ({ 
                   _id: courseId
               
           },{ subtitles:1 })
           
      for(var i =0 ; i<video.subtitles.length ; i++ ){
        if (video.subtitles[i]._id == subtitleId ){
          if (video.subtitles[i].videoTitles.link){
           return video.subtitles[i].videoTitles;
          }
          else break;
       }
    }
           throw new DomainError('no video',400)
   
       }catch(err){
         console.log(err)
           if (err instanceof DomainError) { throw err; }
           throw new DomainError('error internally', 500);
       }
   
   
   
   
       },


    
}

module.exports = userController;