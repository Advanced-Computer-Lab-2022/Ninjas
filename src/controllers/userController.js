const DomainError = require("../error/domainError");
const { Account } = require("../models/account");
const { Course, countryPriceDetails } = require("../models/courses");
const { Exercise } = require("../models/exercise");
const nodemailer = require("nodemailer");
const { Rating } = require("../models/rating");
const UserExercise = require("../models/userExercise");
const { Subtitle } = require("../models/subtitle");
const { assign } = require("nodemailer/lib/shared");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const path = require("path");
const RefundRequest = require("../models/refundRequest");
const Report = require("../models/report");
const RequestAccess = require("../models/requestAccess");
const util = require('util');
const { sessionDetails } = require("../middleware/authMiddleware");
const session = sessionDetails.getSession();
require('dotenv').config()

const maxAge = 3 * 24 * 60 * 60;
//change this too
const createToken = (user) => {
    return jwt.sign({ id: user._id, username: user.username, type: user.type }, process.env.TOKEN, {
        expiresIn: maxAge,
    });

    // jwt.sign creates the webtoken, bya5od el payload f object, wel secret string, wel expires in
    // we should generate a random token and store it in the env file
    // jwt.verify
};
const helperMethods = {
    updateRatingValue({ reviewsArray, newRating }) {
        var count = reviewsArray.length;
        count++;

        var ratingSum = parseInt(newRating);
        reviewsArray.forEach(review => {
            ratingSum = parseInt(ratingSum) + parseInt(review.rating);
        });
        return (ratingSum / count);
    },
}


const userController = {
    
    async signUpError({username, email}){
        try{
            const usernameExists = await Account.findOne({  username });
            const emailExists = await Account.findOne({ email });
            console.log(username)
            console.log(emailExists)
            //the username and email should be unique
           if(emailExists && usernameExists){
           console.log(1);
            throw new DomainError("username and email already exist.", 400);}
           else if (usernameExists){
            console.log(1);
                throw new DomainError("username already exists.", 400);}
           else if (emailExists){
            console.log(3)
                throw new DomainError("email already exists.", 400);}
        //else 
        //throw new DomainError("email already exists.", 200);

        }
        catch (error) {
            if (error instanceof DomainError) throw error;
            else {
                console.log(error);
                throw new DomainError("internal error", 500);
            }
        }
    },
    async signUp({ username, firstName, lastName, email, password, gender }) {
        try {
            const salt = await bcrypt.genSalt();
            //hashes pw
            const hashedPassword = await bcrypt.hash(password, salt);
            //generates new user, with the hashed pw
           // const usernameExists = await Account.findOne({ '$or': [{ username }] });
            //const emailExists = await Account.findOne({ '$or': [{ email }] });

            //the username and email should be unique
        //    if(emailExists && usernameExists)
        //     throw new DomainError("username and email already exist.", 400);
        //    else if (usernameExists)
        //         throw new DomainError("username already exists.", 400);
        //    else if (emailExists)
        //         throw new DomainError("email already exists.", 400);

            const user = await Account.create({
                username,
                firstName,
                lastName,
                email,
                password: hashedPassword,
                gender,
                type: 'INDIVIDUAL_TRAINEE',
                companyPolicy:true

            });
            return user;

        } catch (error) {
            if (error instanceof DomainError) throw error;
            else {
                console.log(error);
                throw new DomainError("internal error", 500);
            }
        }
    },

    async login({ username, password }) {
        try {
            //get the user from the DB
            const user = await Account.findOne({ username });
            if (!user)
                throw new DomainError("username is incorrect", 400);
            //compare hashed password with non hashed one from the input
            const correct = await bcrypt.compare(password, user.password);
            console.log(correct);
            //if the password is not correct or there is now user with the provided email
            if (!correct)
                throw new DomainError("password is incorrect", 400);

            const token = createToken(user);
            return { user, token };

        } catch (error) {
            if (error instanceof DomainError) throw error;
            else {
                console.log(error);
                throw new DomainError("internal error", 500);
            }
        }
    },


    async getSearchResult({
        userId = null, subject = null,
        minPrice = null, maxPrice = null,
        rating = null, title = null,
        instructor = null, totalHours = null
    }) {


        try {
            // lw 7d msh mwgod hytl3 null ?? for next sprints
         
          
            var user = null;
            ///el a7san check eno he is not loged in 3shan lw admin hyd5l
            if (userId == 'null'  ) userId = null;
            console.log(userId)
            if (userId){
             user = await Account.findOne({ _id: userId }, { type: 1, country: 1 }).catch(() => {
                throw new DomainError("ops! something wrong happend please refresh", 400)
            });
            console.log('/////////////')
            //snipped can be moved to controller
            if (user.type == 'ADMIN' || !user.type) {
                throw new DomainError("Unauthorized user", 401);
            }
        }

            let courses;

           // console.log('qq'+subject+'qq')
            // if (title == 'null' ){
            //     console.log('trueee')
            // }

            if (subject == 'null' &&
                rating == 'null' && title == 'null' &&
                instructor == '') {

                courses = await Course.find()
            } else {
                console.log (subject)
                let queryArray = [];
                if (subject != "null") { queryArray.push({ subject: { '$regex': '.*' + subject + '.*', '$options': 'i' } }) }
                if (rating != "null") { queryArray.push({'$and':[{ rating: { 
                    '$gt':  (rating-1)
                } }, { rating: { 
                    '$lte': (rating)
                } }]}) }
                if (title != 'null') {
                    
                    queryArray.push(

                       { '$or': [  
                        { subject: { '$regex': '.*' +  title + '.*', '$options': 'i' } },
                    { title: { '$regex': '.*' +  title + '.*', '$options': 'i' } },
                
                    {
                        instructors: {
                            $elemMatch: {
                                '$or': [{ firstName: { '$regex':'.*' +  title + '.*', '$options': 'i' } },
                                { lastName: { '$regex': '.*' +  title + '.*', '$options': 'i' } }]
                            }
                        }
                    }
                ]}
                )
                }


                courses = await Course.find({
                    '$and': queryArray
                });
            }


            let details;
                if (user)
            {details = countryPriceDetails.get(user.country);}
            else{
             details = countryPriceDetails.get('United States');
            }
            var courses2 =[] ;

            console.log(minPrice)
            for (var i = 0; i < courses.length; i++) {
                // price = price x factor x discount
                if (courses[i].discountDuration && Date.now() > courses[i].discountDuration) { 
                    courses[i].discount=0;
                }
                courses[i].price = courses[i].price * details.factor * ((100 - courses[i].discount) / 100);
                
                if (!(minPrice != 'null' && courses[i].price < minPrice)) {
                    if (!(maxPrice != 'null' && courses[i].price > maxPrice)) { //momkn mykonsh feh
                    //courses.splice(i, 1);
                    courses2.push(courses[i])
                    }
                    
                }
                // if (!(maxPrice != 'null' && courses[i].price > maxPrice)) {
                //     //courses.splice(i, 1);
                // }
            }
            
            return { courses: courses2, currency: details.currency , userType: user? user.type : 'GUEST'};
        }
        catch (err) {
            console.log(err);
            if (err instanceof DomainError) { throw err; }
            else {
                console.log(err)
                throw new DomainError('error internally', 500);
            }
        }
    },
    async changeUserCountry({ userId, type, selectedCountry }) {
        //update the user's record in the database
        try {
            if (type == 'ADMIN')
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

            const resetLink = 'http://localhost:3000/resetPassword/' + user._id;
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
                text: 'Please follow the link to change your password. \n' + resetLink
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
    async resetPassword({ userId, password }) {
        try {
            const salt = await bcrypt.genSalt();
            //hashes pw
            const hashedPassword = await bcrypt.hash(password, salt);

            const updatedPass = await Account.updateOne({ _id: userId }, { password: hashedPassword })
            if (updatedPass.modifiedCount == 1)
                return true
            else throw new DomainError("did not change the password", 500);
        }
        catch (error) {
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
            let course = await Course.findOne({ _id: courseId }).catch(() => {
                throw new DomainError("Wrong courseId", 400)
            });

            //if there is no such course in the DB
            if (course == null)
                throw new DomainError("Course doesn't exist", 400)

            //create the rating object
            const newReview = await Rating.create({
                id: user._id.toString(),
                firstName: user.firstName,
                lastName: user.lastName,
                rating,
                text
            });

            //update the course rating number
            const reviewsArray = course.reviews.filter(rev => rev.id!==(user._id.toString()))
            const updatedCourseRating = helperMethods.updateRatingValue({
                reviewsArray, newRating: rating });

            //if this user already rated the course, delete their rating. we want the data to be up to date -- bonus requirement
            // i didn't pull and push in the same update statement as this would result in a conflict
            await Course.updateOne({ _id: courseId}, { $pull: { "reviews": { id: user._id.toString() } }})
            //push the rating into the course reviews array and update the rating field
            await Course.updateOne(
                { _id: courseId },
                {
                    $set: { rating: updatedCourseRating },
                    $push: { reviews: newReview }
                }
            );

        } catch (error) {
            console.log(error)
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

            //if the user has a record with the same exercise delete it, since we need the grades to be up to date
            await UserExercise.deleteOne({ accountId: userId, "exercises._id": solvedExercise._id});

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

    async viewExersiseGrade(exersiseId, userId) { // in course//for individul , corp
        try {
            const grade = await UserExercise.findOne({
                '$and': [
                    { accountId: userId },
                    { exercises: { $elemMatch: { _id: exersiseId } } }
                ]
            }, { userGrade: 1, gradePercentage: 1, "exercises.totalGrade": 1 })

            if (grade) {

                return { userGrade: grade.userGrade, gradePercentage: grade.gradePercentage, totalGrade: grade.exercises[0].totalGrade, solved: true };
            }


            return { userGrade: 0, gradePercentage: 0, totalGrade: 0, solved: false }
        }
        catch (err) {

            if (err instanceof DomainError) { throw err; }
            throw new DomainError('error internally', 500);
        }
    },


    async viewCorrectAnswers(exersiseId, subtitleId, courseId,userId) { //3yza ala2y try2a a7san
        try {
            

            const exersise = await Course.findOne({
                '$and': [
                    { _id: courseId },
                    { subtitles: { $elemMatch: { "exercises._id": exersiseId } } },
                    { subtitles: { $elemMatch: { _id: subtitleId } } }
                ]
            }, { "subtitles": 1 })



            const updateO =      await UserExercise.updateOne({
                '$and': [
                    { accountId: userId },
                    { exercises: { $elemMatch: { _id: exersiseId } } }
                ]
            }, { viewedAnswers: true})
          

            if (exersise) {
                for (var i = 0; i < exersise.subtitles.length; i++) {
                    if (exersise.subtitles[i].exercises) {
                        for (var j = 0; j < exersise.subtitles[i].exercises.length; j++) {
                            if (exersise.subtitles[i].exercises[j]._id == exersiseId) {
                                return { subtitleId: exersise.subtitles[i]._id, exercises: exersise.subtitles[i].exercises[j] }
                            }
                        }
                    }
                }
            }

      
            //h8yr l true solved

          
            throw new DomainError('not found exersise', 400)

        } catch (err) {
            console.log(err);
            if (err instanceof DomainError) { throw err; }
            throw new DomainError('error internally', 500);
        }




    },


    async viewVideo(courseId, subtitleId, userId) {
        try {
            const video = await Course.findOne({
                _id: courseId

            }, { subtitles: 1, certificate: 1 })

            for (var i = 0; i < video.subtitles.length; i++) {
                if (video.subtitles[i]._id == subtitleId) {
                    if (video.subtitles[i].videoTitles.link) {
                        //the trainee's progress in the course depends on how many videos they have watched
                        //if the video id is not in the user's watched videos, we should add it and update their progress
                        const user = await Account.findOne( {_id: userId });

                        //get the user's current progress in this course
                        const courseProgress = user.progress.filter(prog => prog.courseId.equals(video._id))[0];
                        
                        //if there is no progress in this course, we should create one.
                        if (!courseProgress) {
                            //the percentage
                            const currentProgress = (1 / video.subtitles.length) * 100;

                            //the progress object
                            const newProg = {
                                courseId: video._id,
                                videosWatched: [video.subtitles[i].videoTitles._id],
                                currentProgress
                            }

                            //push it into the progress array
                            await Account.updateOne( { _id: userId }, { $push: { progress: newProg } })
                        }

                        else if (!courseProgress.videosWatched.includes(video.subtitles[i].videoTitles._id)) {
                            //this means that this is the first time that the user watches the video. let's update the progress
                            
                            //push the video into the watched videos
                            courseProgress.videosWatched.push(video.subtitles[i].videoTitles._id);

                            //update progress
                            courseProgress.currentProgress = ( courseProgress.videosWatched.length / video.subtitles.length ) * 100;

                            //if the updated progress is 100 percent
                            if (courseProgress.currentProgress === 100) {
                                //email the user their certificate
                                await this.emailCertificate({ userId, courseId});
                                //add the certificate to the user's array of certificates
                                await Account.updateOne({ _id: userId }, { $push: { certificates: video.certificate }});
                            }

                            //update the user's data in the DB itself
                            await Account.updateOne(
                                { _id: userId, "progress.courseId": courseId },
                                { $set : {
                                     "progress.$.videosWatched": courseProgress.videosWatched,
                                     "progress.$.currentProgress": courseProgress.currentProgress
                                         }
                                },
                                );
                        }
                        return video.subtitles[i].videoTitles;
                    }
                    else break;
                }
            }
            throw new DomainError('no video', 400)

        } catch (err) {
            console.log(err)
            if (err instanceof DomainError) { throw err; }
            throw new DomainError('error internally', 500);
        }




    },

    async viewEnrolledCourses({userId}){
        let myCourses = [];
        try{

            const theUser = await Account.findOne({_id: userId});
            const courses = await Course.find();


            if(theUser.type == 'INDIVIDUAL_TRAINEE' || theUser.type == 'CORPORATE_TRIANEE'){

                for(var i = 0 ; i<courses.length ; i++){

                    for(var j =0; j<courses[i].students.length; j++){
                        if(userId == courses[i].students[j].toString()){
                            myCourses.push(courses[i]);
                            break;
                        }

                    }
                }

            }
            return myCourses;
        }
        catch(err){
            throw new DomainError('error internally', 500);


        }

    },
    async payForCourse({userId, courseId, coursePrice}){ //from wallet needs testing//////////////////
        try{
            const theUser = await Account.findOne({_id: userId}).catch(() => {
                throw new DomainError("Wrong Id", 400)
            });;
            const thisCourse =  await Account.findOne({_id: courseId}).catch(() => {
                throw new DomainError("Wrong Id", 400)
            });;
            if(theUser.type == 'INDIVIDUAL TRAINEE'){
                if(coursePrice == thisCourse.price){
                    await Course.updateOne({_id: courseId}, {$push: { students: userId}});
                   await Course.updateOne({_id:courseId} ,{ $push: { students: userId }})

                }
                // if(theUser.wallet > 0 && theUser.wallet>=thisCourse.price){
                //     let newBalance = theUser.wallet - thisCourse.price;
                //    await Account.updateOne({_id:userId}, {wallet: newBalance })

                // }
         
            }
          //  return myCourses;
        }
        catch(err){
            throw new DomainError('error internally', 500);


        }

    },

    async payForCourse2(userId, courseId, cardNo, country){ //name & postal code
        //sheeeeeelyyy el countryy
         //from credit card
         var cardForm = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
         
        try{
            const theUser = await Account.findOne({_id: userId}).catch(() => {
                throw new DomainError("Wrong Id", 400)
            });;
            const thisCourse =  await Account.findOne({_id: courseId}).catch(() => {
                throw new DomainError("Wrong Id", 400)
            });;
            if(theUser.type == 'INDIVIDUAL TRAINEE' && cardNo.value.match(cardForm) && theUser.country == country){
                await Course.updateOne({_id:courseId} ,{ $push: { students: userId }})
                //what to return
            }
          //  return myCourses;
        }
        catch(err){
            throw new DomainError('error internally', 500);


        }

    },

    async emailCertificate({ userId, courseId }) {
        try {        //this function should be called if the user progress is equal to 100% after its last update.
            //not an endpoint to be called.

            //get the course certificate name from the object itself
            const course = await Course.findOne({ _id: courseId });

            const user = await Account.findOne({ _id: userId });
            const pathToCertificate = path.resolve('certificate/', course.certificate);

            // we will use the nodemailer package to send the email from our gmail (ninjasacl) to the user's email.
            const sender = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'aclninjas@gmail.com',
                    pass: 'iftgjpiijzvveprh'
                }
            });

            const mailOptions = {
                from: 'aclninjas@gmail.com',
                to: user.email,
                subject: 'Congratulations on completing the course: ' + course.title,
                text: 'Please find the certificate attached as a pdf.',
                attachments: [
                    {
                        filename: course.certificate,
                        path: pathToCertificate,
                        contentType: 'application/pdf'
                    }
                ]
            };

            //the function that sends the email
            await sender.sendMail(mailOptions);
        } catch (error) {
            console.log(error)
            if (error instanceof DomainError) throw error;
            else
                throw new DomainError("internal error", 500)
        }

    },
    async acceptPolicy({ userId }) {
    

        try {
            
            
           await Account.updateOne({_id:userId}, {companyPolicy: true})
        }
        catch (err) {
            if (err._message && err._message == 'Course validation failed') { throw new DomainError('validation Error', 400); }
            throw new DomainError('error internally', 500);


        }


},

async requestRefund({ userId,courseId }) {


    try {
        console.log("in")
    var bol=false;
    const account=await Account.findOne({_id:userId})
    console.log(account)
    if (account.progress.filter(prog => prog.courseId===courseId).length===0){
        const newRefundRequest = new RefundRequest({
            accountId:userId,
            courseId:courseId
        })
        newRefundRequest.save();

        //ad5al fel refund array el course
       // Account.updateOne({_id:userId},{wallet:wallet+course.price})
        bol=true;
    }
    for(var i=0;i<account.progress.length;i++){
        if(account.progress[i].courseId.toString()==courseId){
            if(parseInt(account.progress[i].currentProgress)<50){
                const newRefundRequest = new RefundRequest({
                    accountId:userId,
                    courseId:courseId
                })
                newRefundRequest.save();
    
                //ad5al fel refund array el course
               // Account.updateOne({_id:userId},{wallet:wallet+course.price})
                bol=true;
                break;
            }
        }
    }
    if(bol==false){
        console.log("hello")
        throw new DomainError("Can't refund course with progress more than 50%", 400)
    }

    }
    catch (error) {
        console.log(error)
        if (error instanceof DomainError)
            throw error;

        else
            throw new DomainError("internal error", 500);
    }


},

async viewProgress({ userId,courseId }) {
    
  console.log(courseId)
  console.log(userId)
    try {
    const account= await Account.findOne({_id:userId})
    for(var i=0;i<account.progress.length;i++){
        if(account.progress[i].courseId.toString()==courseId){
            return account.progress[i].currentProgress;
        }
    }

    }
    catch (error) {
        if (error instanceof DomainError)
            throw error;
            else
            throw new DomainError("internal error", 500);

    }


},


async ReportCourse( userId,courseId, problem ) {
 try{
    const user = await Account.findOne({ _id: userId }, { type: 1 }).catch(() => {
        throw new DomainError("Wrong Id", 400)
    });
   
    if (user.type == 'ADMIN' || !user.type) {
        throw new DomainError("Unauthorized user", 401);
    }

  if (await Report.findOne({ '$and':[{accountId: userId},{courseId}, {problem}] })){
    throw new DomainError("you already reported", 401);
  }

   const report = await Report.create( {accountId: userId,courseId, problem });
   return "Done";
}
catch(err){
console.log(err)
    if (err instanceof DomainError) throw err;
    else
        throw new DomainError("internal error", 500);
}
},
 

async ViewMyReports( userId ) {
    
   try{
      const reports = await Report.find( {accountId: userId}).catch((err) => {
        console.log(err);
        throw new DomainError("no reports", 400)
    });
      return reports;
   }
   catch(err){
   
       if (err instanceof DomainError) throw err;
       else
           throw new DomainError("internal error", 500);
   }
   },


   
async folllowUp( userId , courseId , problem ) {
    
    try{
       const reports = await Report.updateOne( {'$and':[{accountId:userId}, {courseId} ,{ problem}]}, {followUp : true}).catch(() => {
         throw new DomainError("no reports", 400)
     });
     console.log(reports);
     if (reports.modifiedCount>0)
       return 'Done';
       else 
       return 'a follow up was done before';
    }
    catch(err){
    
        if (err instanceof DomainError) throw err;
        else
            throw new DomainError("internal error", 500);
    }
    },

async viewWallet({userId}) {


      try {
      const account= await Account.findOne({_id:userId});
      if(account.type == 'INDIVIDUAL_TRAINEE'){
        //balance = balance + account.wallet;
        //console.log("wallettt");
        //console.log(account);    
       // console.log(account.wallet);
        return account.wallet;
  
          }
      }
      catch (err) {
          if (err._message && err._message == 'Course validation failed') { throw new DomainError('validation Error', 400); }
          throw new DomainError('error internally', 500);
        }
    },
   
    async viewCourseVideo(courseId) {
        try {
            const video = await Course.findOne({
                _id: courseId

            }, {videoLink:1}).catch(() => {
                video = null;
            });

           return video.videoLink;

      }
           catch (err) {
            
              if (err instanceof DomainError) { throw err; }
            throw new DomainError('error internally', 500);
        }




    },

    async requestAccess(userId , courseId){

        try{
        const requested = await RequestAccess.create({accountId: userId , courseId}).catch(() => {
            throw new DomainError("try again and check course availability", 400)
        });

        return "Done";
    }

    catch (err){
        
        if (err instanceof DomainError) { throw err; }
        throw new DomainError('error internally', 500);
    }
    },

async mostPopularCourses() {
    try {
    //according to the TA on piazza we need the courses with most amount of registered students
    const popularCourses = await Course.find();

    //sorter that sorts by the length of the students array
    const sorter = (a, b) => {
        if(a.students.length > b.students.length) {
           return -1;
        } else {
           return 1;
        }
     }

    //we will assume for now that we need to display the three most popular courses
    return popularCourses.sort(sorter).splice(0,4);
    } catch(error) {
        console.log(error);
        throw new DomainError("internal error", 500);
    }
},

async getCourse({ courseId, userType, userId }) {
    try {
        let course;
        let curr;
        const { country }= await Account.findOne({ _id: userId }, {country:1})

        if (userType == 'CORPORATE_TRAINEE') {
            //they should not be able to see the price
            course = await Course.findOne({ _id: courseId }, { price: 0 });
        }
        else {
            course = await Course.findOne({ _id: courseId });
            curr = countryPriceDetails.get(country);
        }

        if (course === null) {
            throw new DomainError("Course not found.", 400);
        }

        //if there is currently a discount that should've been expired
        if (course.discountDuration && Date.now() > course.discountDuration) { 
            //update the local course object
            course.discountDuration = null;
            course.discount = 0;

            //update the value in the DB
            await Course.updateOne({ _id: courseId }, { discountDuration: null, discount:0 });
        }

        const response = { course }
        if (curr) {
            response.currency = curr.currency;
            response.factor = curr.factor;
        }
        else {
            response.currency = "";
            response.factor = 1;
        }

        return response;
    } catch(error) {
        console.log(error)
        if (error instanceof DomainError) throw error;
        else
        throw new DomainError("internal error", 500);
    }
},

async checkRequestedAccess({ userId, courseId }) {
    try {
    const requested = await RequestAccess.findOne({ accountId:userId, courseId});
    if (!requested)
    throw new DomainError("access was not requested", 400);
    else
    return requested;
    } catch(error) {
        if (error instanceof DomainError) throw error;
        else
        throw new DomainError("internal error", 500);
    }
},

async checkRequestedRefund({ userId, courseId }) {
    try {
        const requested = await RefundRequest.findOne({ accountId: userId, courseId});
        if (!requested)
            throw new DomainError("access was not requested", 400);
        else
            return requested;
    } catch(error) {
        throw new DomainError("internal error", 500);
    }
},

async deleteCourseRating({ userId, courseId }) {
    try {
        const course = await Course.findOne({ _id: courseId });
        const updatedReviewsArray = course.reviews.filter( rev => rev.id!==(userId.toString()));

        let newRateSum = 0;
        updatedReviewsArray.forEach( rev => newRateSum = parseInt(newRateSum) + parseInt(rev.rating));
        const newRating = newRateSum / updatedReviewsArray.length;

        await Course.updateOne({ _id: courseId}, {
            rating: newRating,
            $pull: { "reviews": { id: userId.toString() } }
        })
    } catch(error) {
        console.log(error);
        throw new DomainError("internal error", 500);
    }
},

async exerciseHistory({ userId, courseId }) {
    try {
        const { subtitles } = await Course.findOne({ _id: courseId }, { subtitles:1 });
        const userSolvedExercises = await UserExercise.find({ accountId: userId, "exercises.subtitleId": { $in: subtitles.map(s => s._id) }});
        return userSolvedExercises;
    } catch(error) {
        throw new DomainError("internal error", 500);
    }
}

}



module.exports = userController;