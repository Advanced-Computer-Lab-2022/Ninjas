const mongoose = require('mongoose');
const { Account, accountSchema } = require("../models/account");
const { Course, countryPriceDetails } = require("../models/courses");
const  InstructorToCourses  = require("../models/InstructorToCourses");
const { Exercise, exerciseSchema } = require('../models/exercise');
const { subtitleSchema, Subtitle } = require('../models/subtitle');
const DomainError = require("../error/domainError");
const { Video } = require('../models/video');
const { question } = require('../models/question');
const bcrypt = require('bcrypt');
const UserExercise = require('../models/userExercise');
var subtitlesArray = [subtitleSchema];
var Totalhrs = 0;
let questionArray = [];
var exerciseArray = [];
var subtitleArray2 = [];

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const instructorController = {
    async getViewResult({
        username
    }) {
        try {
            const result = []
            const courses = await Course.find({

            })

            for (var i = 0; i < courses.length; i++) {
                for (var j = 0; j < courses[i].instructors.length; j++) {
                    if (courses[i].instructors[j].username && courses[i].instructors[j].username == username) {
                        result.push(courses[i]);
                        break;
                    }

                }

            }
            return result;
        }
        catch (err) {
            throw new DomainError('error internally', 500);
        }

    },

    async changePassword({

        userId, oldPassword, newPassword
    }) {
        try {
            const salt = await bcrypt.genSalt();
            //hashes pw
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            const user = await Account.findOne({ _id: userId }).catch(() => {
                throw new DomainError("Wrong Id", 400)
            });
            console.log(user.password)
            if(newPassword.length<6){
                throw new DomainError("Password Length must be atleast 6", 400);
            }
            console.log("inn");
            console.log(user);
            const correct2=await bcrypt.compare(newPassword, user.password);
            console.log(correct2);
            if(correct2){
                 throw new DomainError("Cant't change new password to old password", 400);
             }
            const correct=await bcrypt.compare(oldPassword,user.password);
            console.log(correct);
            if(correct){
                await Account.updateOne({_id:userId}, {password: hashedPassword})
            }
            if(!correct) {             
            throw new DomainError("Old Password is incorrect, try again", 400);}
            



        }
        catch (err) {
            if (err instanceof DomainError) throw err;
            else
            throw new DomainError('error internally', 500);
        }


    },

    async editEmail({

        userId, newEmail
    }) {
        try {
            // if(userId=="" || oldEmail=="" || newEmail==""){
            //     throw new DomainError("All fields must be filled", 400)
            // }
            const x = validateEmail(newEmail);
            if(!x) {
                throw new DomainError("Wrong email format", 400)

            }
            
            const user = await Account.findOne({ _id: userId }).catch(() => {
                throw new DomainError("Wrong Id", 400)
            });



            let o = await Account.findOne({email: newEmail});
            console.log(o);
            if (o != null && o._id != userId) {
                console.log("daa5al")
                throw new DomainError("email already exits", 400);

            } 
            else if(user.email==newEmail){
                throw new DomainError("You can not change your old email to new email", 400);
            }
                else {

                    await Account.updateOne({ _id: userId }, { email: newEmail });

                }

            



        }
        catch (err) {
            if (err instanceof DomainError) throw err;
            else
            throw new DomainError('error internally', 500);
        }

    },

    async editBiography({

        userId, newText
    }) {
        try {
            // if(userId=="" || newText==""){
            //     throw new DomainError("All fields must be filled", 400)
            // }
            
            const user = await Account.findOne({ _id: userId }).catch(() => {
                throw new DomainError("Wrong Id", 400)
            });
            if(newText.length<20){
                throw new DomainError("Biography must be at least 20 characters", 400)
            }
            else{
                console.log('update');
            await Account.updateOne({_id: userId}, {biography: newText});}




        }
        catch (err) {
            if (err instanceof DomainError) throw err;
            else
            throw new DomainError('error internally', 500);
        }


    },

    async addDiscount({

        courseId, discount, discountDuration
    }) {
        try {
            if(courseId=="" || discount=="" || discountDuration==""){
                throw new DomainError("All fields must be filled", 400)
            }
            const user = await Course.findOne({ _id: courseId }).catch(() => {
                throw new DomainError("Wrong Id", 400)
            });

            if(!(discountDuration>0 && discountDuration<=12)){
                throw new DomainError("Discount Duration must be within 0 to 12 months", 400)
            }



            await Course.updateOne({ _id: courseId }, { discount: discount });
            await Course.updateOne({ _id: courseId }, { discountDuration: discountDuration });




        }
        catch (err) {
            if (err instanceof DomainError) throw err;
            else
            throw new DomainError('error internally', 500);
        }

    },

    async viewInstReview({

        userId
    }) {
        try {
            console.log(userId);
           /* for(let i = 0; i<InstructorToCourses.length ; i++){
                if(userId != InstructorToCourses.Account._id){
                    throw new DomainError("Wrong Id", 400)
                }
                return InstructorToCourses.rating;
            }*/
            const user = await Account.findOne({ _id: userId }).catch(() => {
               throw new DomainError("Wrong Id", 400)
            });

            return user.review;
        }
        catch (err) {
            throw new DomainError('error internally', 500);
        }

    },



    async getSearchResult({

        username, search, userId
    }) {

        console.log('search')
       console.log(search)
        try {
            const final = [];
            const result3 = []
            const courses = await Course.find({

            })
            for (var i = 0; i < courses.length; i++) {
                for (var j = 0; j < courses[i].instructors.length; j++) {
                    if (courses[i].instructors[j].username && courses[i].instructors[j].username == username) {
                        result3.push(courses[i]);
                        break;
                    }

                }

            }
            const user = await Account.findOne({ _id: userId }, { country: 1 }).catch(() => {
                throw new DomainError("Wrong Id", 400)
            });;

            for (var i = 0; i < result3.length; i++) {
                if (result3[i].subject.toString().toLowerCase().includes(search.toString().toLowerCase()) || 
                result3[i].title.toString().toLowerCase().includes(search.toString().toLowerCase())) {

                    final.push(result3[i]);

                }
                else {

                    for (var j = 0; j < result3[i].instructors.length; j++) {

                        if (result3[i].instructors[j].firstName.toString().toLowerCase().includes(search.toString().toLowerCase()) ||
                            result3[i].instructors[j].lastName.toString().toLowerCase().includes(search.toString().toLowerCase()) ||
                            result3[i].instructors[j].username.toString().toLowerCase().includes(search.toString().toLowerCase())
                        ) {
                            final.push(result3[i]);
                        }

                    }

                }

            }
            let details = countryPriceDetails.get(user.country);
            for (var i = 0; i < final.length; i++) {
                // price = price x factor x discount
                final[i].price = final[i].price * details.factor * ((100 - details.discount) / 100);
            }
          
            return { courses: final, currency: details.currency, userType: 'INSTRUCTOR' };
        }
        catch (err) {
            console.log(err)
            throw new DomainError('error internally', 500);
        }


    },


    async getFilterResult({

        username, userId, subject, minPrice, maxPrice, search
    }) {

        try {
            let final = [];
            const courses = (await this.getSearchResult({username, search, userId})).courses;
            console.log(courses);
            const user = await Account.findOne({ _id: userId }, { country: 1 }).catch(() => {
                throw new DomainError("Wrong Id", 400)
            });;
            
            if(subject == "" && minPrice == "" && maxPrice == ""){
                let details = countryPriceDetails.get(user.country);
           
                // for (var i = 0; i < courses.length; i++) {
                //     courses[i].price = courses[i].price * details.factor * ((100 - details.discount) / 100);
                // }
                return { courses: courses, currency: details.currency, userType: 'INSTRUCTOR' };
            }
            if(subject == "" && minPrice == "" && maxPrice !== ""){
                final = [];
                let details = countryPriceDetails.get(user.country);
                // for (var i = 0; i < courses.length; i++) {
                //     courses[i].price = courses[i].price * details.factor * ((100 - details.discount) / 100);
                // }
                for(var i=0; i< courses.length; i++){
                    if(courses[i].price <= maxPrice)
                       final.push(courses[i]);
                }
                return { courses: final, currency: details.currency, userType: 'INSTRUCTOR' };
            }
            if(subject == "" && minPrice !== "" && maxPrice == ""){
                final = [];
                let details = countryPriceDetails.get(user.country);
                // for (var i = 0; i < courses.length; i++) {
                //     courses[i].price = courses[i].price * details.factor * ((100 - details.discount) / 100);
                // }
                for(var i=0; i< courses.length; i++){
                    if(courses[i].price >= minPrice)
                      final.push(courses[i]);
                }
                // let details = countryPriceDetails.get(user.country);
           
                // // for (var i = 0; i < final.length; i++) {
                // //     final[i].price = final[i].price * details.factor * ((100 - details.discount) / 100);
                // }
                return { courses: final, currency: details.currency, userType: 'INSTRUCTOR' };
            }
            if(subject == "" && minPrice !== "" && maxPrice !== ""){
                final = [];
                for(var i=0; i< courses.length; i++){
                    if(courses[i].price >= minPrice && courses[i].price <= maxPrice)
                        final.push(courses[i]);
                }
                let details = countryPriceDetails.get(user.country);
           
                // for (var i = 0; i < final.length; i++) {
                //     final[i].price = final[i].price * details.factor * ((100 - details.discount) / 100);
                // }
                console.log(final);
                return { courses: final, currency: details.currency, userType: 'INSTRUCTOR' };
            }
            if(subject !== "" && minPrice == "" && maxPrice == ""){
                final = [];
                for(var i=0; i< courses.length; i++){
                    if(courses[i].subject.toString().toLowerCase() == subject.toString().toLowerCase())
                        final.push(courses[i]);
                }
                let details = countryPriceDetails.get(user.country);
           
                // for (var i = 0; i < final.length; i++) {
                //     final[i].price = final[i].price * details.factor * ((100 - details.discount) / 100);
                // }
                return { courses: final, currency: details.currency, userType: 'INSTRUCTOR' };
            }
            if(subject !== "" && minPrice == "" && maxPrice !== ""){
                final = [];
                for(var i=0; i< courses.length; i++){
                    if(courses[i].subject.toString().toLowerCase() == subject.toString().toLowerCase() 
                    && courses[i].price <= maxPrice)
                        final.push(courses[i]);
                }
                let details = countryPriceDetails.get(user.country);
           
                // for (var i = 0; i < final.length; i++) {
                //     final[i].price = final[i].price * details.factor * ((100 - details.discount) / 100);
                // }
                return { courses: final, currency: details.currency, userType: 'INSTRUCTOR' };
            }
            if(subject !== "" && minPrice !== "" && maxPrice == ""){
                final = [];
                for(var i=0; i< courses.length; i++){
                    if(courses[i].subject.toString().toLowerCase() == subject.toString().toLowerCase() 
                    && courses[i].price >= minPrice)
                        final.push(courses[i]);
                }
                let details = countryPriceDetails.get(user.country);
           
                // for (var i = 0; i < final.length; i++) {
                //     final[i].price = final[i].price * details.factor * ((100 - details.discount) / 100);
                // }
                return { courses: final, currency: details.currency, userType: 'INSTRUCTOR' };
            }
            if(subject !== "" && minPrice !== "" && maxPrice !== ""){
                final = [];                
                for(var i=0; i< courses.length; i++){
                    if(courses[i].subject.toString().toLowerCase() == subject.toString().toLowerCase() 
                    && courses[i].price >= minPrice && courses[i].price <= maxPrice)
                        final.push(courses[i]);
                }
                let details = countryPriceDetails.get(user.country);
           
                // for (var i = 0; i < final.length; i++) {
                //     final[i].price = final[i].price * details.factor * ((100 - details.discount) / 100);
                // }
                return { courses: final, currency: details.currency, userType: 'INSTRUCTOR' };
            }

        }
        catch (err) {
            throw new DomainError('error internally', 500);
        }


    },



    async addsubtitle({instructorId, courseId, text, hours, title, videoLink, description }) {
        // for (var i = 0; i < subArray.length; i++) {
        //     const sub = new Subtitle({
        //         text: subArray[i].text,
        //         hours: subArray[i].hours
        //     })
        //     await sub.save()
        //     subtitlesArray.push(sub);
        // }
        // return subtitlesArray

        try {
            const thisInstructor = await Account.findOne({ _id: instructorId }).catch(() => {
                throw new DomainError("Wrong Id", 400)
            });
            const thisCourse = await Account.findOne({ _id: courseId }).catch(() => {
                throw new DomainError("Wrong Id", 400)
            });
           
            const Newsubtitle = new Subtitle({
                text: text,
                hours: hours,
                title: title,
                link: videoLink,
                description: description
            })
            Newsubtitle.save();
            // console.log(courseId);
            await Course.updateOne({_id: courseId}, {$push: { subtitles: Newsubtitle }})
            console.log(Newsubtitle._id);

      
        return Newsubtitle

        } catch (err) {
            if (err._message && err._message == 'Course validation failed') { 
                console.log(err);
                throw new DomainError('validation Error', 400); }
            throw new DomainError('error internally', 500);


        }

    },

    async addExercise({instructorId, subtitleId, courseId, title, questionText, choice1, choice2, choice3, choice4, correctAnswer, totalCredit }) {
       
        try {
            const thisInstructor = await Account.findOne({ _id: instructorId }).catch(() => {
                throw new DomainError("Wrong Id", 400)
            });
          
           
            const Newquestion = new question({
                questionText: questionText,
                mcqs: [choice1, choice2, choice3, choice4],
                correctAnswer: correctAnswer,
                totalCredit: totalCredit
            })

            await Newquestion.save();
           // console.log("hellooooo");

           // console.log(Newquestion._id);

            const NewExercise = new Exercise({
                title: title,
                subtitleId: subtitleId,
            })

            NewExercise.questions.push(Newquestion);

            for(var i=0; i< NewExercise.questions.length ; i++ ){
                NewExercise.totalGrade = NewExercise.totalGrade + NewExercise.questions[i].totalCredit;

            }
            NewExercise.save();
            
            await Subtitle.updateOne({_id: subtitleId}, {$push: { exercises: NewExercise }});
            // const sub = await Subtitle.findOne({_id: subtitleId})

            // await Course.updateOne({_id: courseId}, {$pop: { subtitles: sub }});
            // await Course.updateOne({_id: courseId}, {$push: { subtitles: sub }});


            const c = Course.findOne({_id: courseId});
            for(var j=0; j<c.subtitles ; j++){
                if(c.subtitles[j]._id == subtitleId){
                    c.subtitles[j].exercises.push(NewExercise);
                    break;
                }

            }


            console.log(NewExercise._id);

      
        return NewExercise;

        } catch (err) {
            if (err._message && err._message == 'Course validation failed') { 
                console.log(err);
                throw new DomainError('validation Error', 400); }
            throw new DomainError('error internally', 500);


        }

    },


    async addAnotherQuestion ({instructorId, exerciseId, questionText, choice1, choice2, choice3, choice4, correctAnswer, totalCredit}){

        try {

            const thisInstructor = await Account.findOne({ _id: instructorId }).catch(() => {
                throw new DomainError("Wrong Id", 400)
            });
            const thisEx = await Exercise.findOne({ _id: exerciseId }).catch(() => {
                throw new DomainError("Wrong Id", 400)
            });
           
            const Newquestion = new question({
                questionText: questionText,
                mcqs: [choice1, choice2, choice3, choice4],
                correctAnswer: correctAnswer,
                totalCredit: totalCredit
            })

            await Newquestion.save();
            console.log("hellooooo");
            console.log("hellooooo00000000000000000000");
            console.log(Newquestion._id);
            console.log("hellooooo00000000000000000000");

            const thisEx2 = await Exercise.findOne({ _id: exerciseId }).catch(() => {
                throw new DomainError("Wrong Id", 400)
            });

            thisEx2.questions.push(Newquestion);
            let newGrade = thisEx2.totalGrade + Newquestion.totalCredit;
            await Exercise.updateOne({_id: exerciseId}, {totalGrade: newGrade});
            await Exercise.updateOne({_id: exerciseId}, {$push: { questions: Newquestion }});

            //thisEx2.totalGrade = thisEx2.totalGrade + Newquestion.totalCredit;
            // await Exercise.updateOne({_id: exerciseId}, {$push: {questions, Newquestion}});
            // let newGrade = thisEx.totalGrade + Newquestion.totalCredit;
            // await Exercise.updateOne({_id: exerciseId}, {totalGrade: newGrade});
        


        return Newquestion;

        } catch (err) {
            if (err._message && err._message == 'Course validation failed') { 
                console.log(err);
                throw new DomainError('validation Error', 400); }
            throw new DomainError('error internally', 500);


        }


    },

    // async addAnotherExercise({subtitleId, title, questionText, choice1, choice2, choice3, choice4, correctAnswer, totalCredit}){

    //     try {
    //         // const thisInstructor = await Account.findOne({ _id: instructorId }).catch(() => {
    //         //     throw new DomainError("Wrong Id", 400)
    //         // });
    //         const thisSub = await Exercise.findOne({ _id: subtitleId }).catch(() => {
    //             throw new DomainError("Wrong Id", 400)
    //         });
           
    //         const Newquestion = new question({
    //             questionText: questionText,
    //             mcqs: [choice1, choice2, choice3, choice4],
    //             correctAnswer: correctAnswer,
    //             totalCredit: totalCredit
    //         })

    //         await Newquestion.save();
    //         console.log("hellooooo");

    //         console.log(Newquestion._id);

    //         await Exercise.updateOne({_id: exerciseId}, {$push: {questions, Newquestion}});
    //         let newGrade = thisEx.totalGrade + Newquestion.totalCredit;
    //         await Exercise.updateOne({_id: exerciseId}, {totalGrade: newGrade});
    //        // await Subtitle.updateOne({_id: exerciseId}, {totalGrade: newGrade});

    //     return Newquestion;

    //     } catch (err) {
    //         if (err._message && err._message == 'Course validation failed') { 
    //             console.log(err);
    //             throw new DomainError('validation Error', 400); }
    //         throw new DomainError('error internally', 500);


    //     }


    // },


    

    async calculateHours(subArray) {
        for (var i = 0; i < subArray.length; i++) {

            Totalhrs += subArray[i].hours;
        }
        return Totalhrs

    },


    async createcourse({subject, price, totalHours, summary, title, instructorId ,videoLink }) {
       
        try {
            const thisInstructor = await Account.findOne({ _id: instructorId }).catch(() => {
                throw new DomainError("Wrong Id", 400)
            });
            // let i = [];
            // var res = videoLink.split("=");
            // var embeddedUrl = "https://www.youtube.com/embed/"+res[1];

           
            // console.log("helllooo");
            // console.log(thisInstructor);

            const Newcourse = new Course({
                subject: subject,
                price: price,
                totalHours: totalHours,
                summary: summary,
                title: title,
                videoLink: videoLink
            })
            Newcourse.instructors.push(thisInstructor)
            // console.log(Newcourse);
            // console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
            // console.log(Newcourse);

        Newcourse.save();
        return Newcourse;
        } catch (err) {
            if (err._message && err._message == 'Course validation failed') { 
                console.log(err);
                throw new DomainError('validation Error', 400); }
            throw new DomainError('error internally', 500);


        }


    },

    async createQuestion({ exerciseId, mcq1, mcq2, mcq3, mcq4, correctAnswer, title, totalCredit }) {
        const thisExercise = await Exercise.findOne({ _id: exerciseId }).catch(() => {
            throw new DomainError("Wrong Id", 400)
        });
        try {
            
            const newQuestion = new question({
                questionText: title,
                mcqs: [mcq1, mcq2, mcq3, mcq4],
                correctAnswer: correctAnswer,
                totalCredit: totalCredit
            })
            await newQuestion.save()
            thisExercise.questions.push(newQuestion);

        } catch (err) {
            if (err._message && err._message == 'Course validation failed') { throw new DomainError('validation Error', 400); }
            throw new DomainError('error internally', 500);


        }


    },
    async createExercise({ courseId ,subtitleId,title}) {

    
        try { 
            console.log(courseId)
            console.log(subtitleId)
           // courseId2=courseId.split(" ")
           // subtitle=courseId2[1].split("=")
           // subtitleId2=subtitle[1].toString()
            const c=await Course.findOne({_id:courseId})
           console.log(c);
                const newExercise = new Exercise({
                    title: title,
                    subtitleId:subtitleId,
                    questions: questionArray
                })

                questionArray=[]
                await newExercise.save()
                //inside the course object, find the subtitle, and push into the exercise array
                await Course.updateOne({ _id: courseId, "subtitles._id": subtitleId }, {
                    $push: { "subtitles.$.exercises" : newExercise }
                });
            }


        catch (err) {
            if (err._message && err._message == 'Course validation failed') { throw new DomainError('validation Error', 400); }
            throw new DomainError('error internally', 500);


        }},



    async acceptContract({ userId }) {
    

        try {
            
            
           await Account.updateOne({_id:userId}, {contractStatus: true})
        }
        catch (err) {
            if (err._message && err._message == 'Course validation failed') { throw new DomainError('validation Error', 400); }
            throw new DomainError('error internally', 500);


        }


},

async didRatedInst (instructorId , userId ,deleteR)
{try {


    if(deleteR == 'true'){

        await Account.findOneAndUpdate({_id : instructorId}, {"$pull": {"review" : {id: userId}}})
        return false;
    }
    
    else{

       
   const found = await Account.findOne({'$and': [
        { _id : instructorId  },
        { review: { $elemMatch: { id: userId } } }
    ]}).catch(()=> {return false;})

    if (found){

        return true;
    }
    else return false;
}

}
catch(err){
    console.log(err)
    if (err instanceof DomainError) { throw err; }
    throw new DomainError('error internally', 500);
}  

},
async rateInstructor (instructorId , userId , ratingNumber, ratingText ){
try {


      if (!ratingNumber || !( 0<= ratingNumber && ratingNumber <=5 )){
        throw new DomainError('rating should be between 0-5',400)
      }


    const name = await Account.findOne({_id : userId},{firstName : 1 , lastName: 1, _id : 1, type: 1})  
   if (name.type == 'CORPORATE_TRAINEE'|| name.type == 'INDIVIDUAL_TRAINEE'){

    let query =  {id: name._id ,rating : ratingNumber , text: ratingText ,firstName : name.firstName , lastName: name.lastName}
   
    
    await Account.findOneAndUpdate({_id : instructorId}, {"$pull": {"review" : {id: query.id}}})



   
    const result = await Account.findOneAndUpdate({ _id : instructorId},
        {   "$push": { "review": query }  },
        { "new": true, "upsert": true })
  

        let rate = 0;
        let count =0;
        for(count; count< result.review.length;count++ ){
          rate+= result.review[count].rating;
     
        }
        
        if ((count)==0){count = 1};
       let generalRating= (rate/count)>=0?(rate/count):0
     

        await Account.findOneAndUpdate({ _id : instructorId}, {rating:generalRating})
       
        return
  
    }


    throw new DomainError('you should be a student to rate',400);
    }
    catch(err){
        console.log(err)
        if (err instanceof DomainError) { throw err; }
        throw new DomainError('error internally', 500);
    }  

},

   

    async getInstructorData({ userId }) {
        try {
            const instructor = await Account.findOne({ _id: userId }).catch(() => {
                throw new DomainError("Wrong Id", 400)
            });

            if (instructor.type != 'INSTRUCTOR')
                throw new DomainError("This is not an instructor.");

            return instructor;

        } catch (error) {
            console.log(error)
            if (error instanceof DomainError)
                throw error;
            else
                throw new DomainError("internal error", 500);
        }
    },

    async getCourseRatings({ courseId }) {
        try {
            const course = await Course.findOne({ _id: courseId }).catch(() => {
                throw new DomainError("Wrong Id", 400)
            });

            return course.reviews;

        } catch (error) {
            console.log(error)
            if (error instanceof DomainError)
                throw error;
            else
                throw new DomainError("internal error", 500);
        }
    },
    async getCourseSubtitles({ courseId }) {
        try {
            const course = await Course.findOne({ _id: courseId }).catch(() => {
                throw new DomainError("Wrong Id", 400)
            });

            return course.subtitles;

        } catch (error) {
            console.log(error)
            if (error instanceof DomainError)
                throw error;
            else
                throw new DomainError("internal error", 500);
        }
    },

    // async addQuestion2({ questionText, mcq1,mcq2,mcq3,mcq4, correctAnswer, totalCredit}) {

    //      try {
    //         console.log(questionText,mcq1,mcq2,mcq3,mcq4,correctAnswer,totalCredit);
    //         const newQuestion = new question({
    //          questionText: questionText,
    //          mcqs:[mcq1,mcq2,mcq3,mcq4],
    //          correctAnswer: correctAnswer,
    //          totalCredit: totalCredit
 
    //         })
    //         newQuestion.save()
    //         questionArray.push(newQuestion)
 
         
    //      } catch (err) {
    //          if (err._message && err._message == 'Course validation failed') { throw new DomainError('validation Error', 400); }
    //          throw new DomainError('error internally', 500);
 
 
    //      }
 
 
    //  },

    async addQuestion2({exerciseTitle, subtitleId, questionText, mcq1,mcq2,mcq3,mcq4, correctAnswer, totalCredit}) {

        try {
           let c = "";
           console.log(questionText,mcq1,mcq2,mcq3,mcq4,correctAnswer,totalCredit);
           if(correctAnswer == "Choice 1"){
               c = mcq1;
           }
           else{
               if( correctAnswer == "Choice 2"){
                   c = mcq2;
               }
               else{
                   if(correctAnswer == "Choice 3"){
                       c = mcq3;
                   }
                   else{
                       c = mcq4;

                   }
               }
           }
           const newQuestion = new question({
            questionText: questionText,
            mcqs:[mcq1,mcq2,mcq3,mcq4],
            correctAnswer: c,
            totalCredit: totalCredit

           })
           newQuestion.save()
           questionArray.push(newQuestion);

           const newExercise = new Exercise({
               exerciseTitle: exerciseTitle,
               subtitleId:subtitleId,
               totalGrade: totalCredit,
              })
           newExercise.questions.push(newQuestion);
           return newExercise;

        
        } catch (err) {
            if (err._message && err._message == 'Course validation failed') { throw new DomainError('validation Error', 400); }
            throw new DomainError('error internally', 500);


        }


    },

     async addVideo({ subtitleId, title, link, description}) {


         try {
            var res = link.split("=");
            var embeddedUrl = "https://www.youtube.com/embed/"+res[1];
            console.log("henaaa1")
            const newVideo = new Video({
             title: title,
             link: embeddedUrl,
             description: description
            })
            console.log("henaaa")
            newVideo.save();
            console.log("henaaa3")
            await Subtitle.updateOne({_id:subtitleId}, {videoTitles: newVideo})
            console.log("henaaa4")
 
         
         } catch (err) {
             if (err._message && err._message == 'Course validation failed') { throw new DomainError('validation Error', 400); }
             throw new DomainError('error internally', 500);
 
 
         }
 
 
     },
     async addVideoCourse({ courseId, videoLink}) {


        try {
           var res = videoLink.split("=");
           var embeddedUrl = "https://www.youtube.com/embed/"+res[1];
        await Course.updateOne({_id:courseId},{videoLink:embeddedUrl})


        
        } catch (err) {
            if (err._message && err._message == 'Course validation failed') { throw new DomainError('validation Error', 400); }
            throw new DomainError('error internally', 500);


        }


    },
    //////////////////////////////////////Dool zyada
    async viewSubtitleEx({ subtitleId}) {


        try {
           const thisSubtitle = await Subtitle.findOne({ _id: subtitleId })
           return thisSubtitle.exercises
        
        } catch (err) {
            if (err._message && err._message == 'Course validation failed') { throw new DomainError('validation Error', 400); }
            throw new DomainError('error internally', 500);


        }


    },
    async viewSubtitleVid({ subtitleId}) {


        try {
            const thisSubtitle = await Subtitle.findOne({ _id: subtitleId })
            return thisSubtitle.videoTitles
        
        } catch (err) {
            if (err._message && err._message == 'Course validation failed') { throw new DomainError('validation Error', 400); }
            throw new DomainError('error internally', 500);


        }


    },

    async viewMyDetails({userId}){

       
        try {

        const thisInstructor = await Account.findOne({_id: userId}).catch(() => {
            throw new DomainError("Wrong Id", 400)
        });

        return thisInstructor

    }
    catch (err) {

        console.log("in catchhhh")

        if (err._message && err._message == 'Course validation failed') { throw new DomainError('validation Error', 400); }
        throw new DomainError('error internally', 500);

    }
    },

    async owedMoney({userId}){
        let myMoney = 0;
        try{

            const courses = await Course.find();
            const theUser = await Account.findOne({_id: userId}).catch(() => {
                throw new DomainError("Wrong Id", 400)
            });;

            for(var i=0; i<courses.length; i++){
                if(courses[i].instructors[0]._id.toString() == userId.toString()){
                    myMoney = ((courses[i].price*courses[i].students.length) - (0.13*courses[i].price*courses[i].students.length));

                }

            }
           // await Account.updateOne({_id:userId}, {wallet: myMoney});
           //I guess we should have a new schema of instructor with owedMoney or even a field in account called
           //owed money other than wallet as difference is wallet money i can use now but owed is money i should
           //get but have not got it yet...We need this field so that when admin refunds money to student it is
           //subtracted from owed money of corresponding instructor  
            return myMoney;
        }
        catch(err){
            throw new DomainError('error internally', 500);
     
     
        }
    },

    async averageExerciseGrade({courseId}) {
        try {
            //get the subtitles
            const { subtitles } = await Course.findOne({ _id: courseId }, { subtitles:1 });

            const gradesInExercise = new Map();

            //set a key and a value for each exercise
            subtitles.forEach(sub => {
                sub.exercises.forEach(ex => {
                    gradesInExercise.set(
                        ex._id.toString(),
                        {
                        accumulatedGrade: 0,
                        solveCount:0
                        }
                    );
                }); 
            });
            //console.log(gradesInExercise)
            //get the subtitle IDs
            const subIds = subtitles.map(s => s._id);
            //get the solved exercises
            const solvedExercises = await UserExercise.find({ "exercises.subtitleId": { $in: subIds }});
            
            //update the accumulated grade and the number of times the exercise has been solved
            solvedExercises.forEach( ex => {
                //console.log(ex.exercises[0]._id)
                gradesInExercise.set(ex.exercises[0]._id.toString(),
                    {
                        accumulatedGrade: gradesInExercise.get(ex.exercises[0]._id.toString()).accumulatedGrade + ex.userGrade,
                        solveCount: gradesInExercise.get(ex.exercises[0]._id.toString()).solveCount + 1 
                    });
            });

            //console.log(gradesInExercise)
            const result=[];
            let exerciseIDS = Array.from(gradesInExercise.keys());

            exerciseIDS.forEach( ex => {
            let avgGrade = gradesInExercise.get(ex).accumulatedGrade / gradesInExercise.get(ex).solveCount;
            //if the exercise was not solved before the solve count is zero, and anything divided by zero is undefined.
            if (!avgGrade) 
                avgGrade = 0;

            result.push({
                exerciseId: ex,
                avgGrade
            })
           })
            
           return result;

        } catch(error) {
            console.log(error)
            throw new DomainError("internal error", 500);
        }
    }
 
}

module.exports = instructorController;