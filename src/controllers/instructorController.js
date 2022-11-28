const mongoose = require('mongoose');
const { Account } = require("../models/account");
const { Course, countryPriceDetails } = require("../models/courses");
const  InstructorToCourses  = require("../models/InstructorToCourses");
const { exerciseSchema } = require('../models/exercise');
const { subtitleSchema, Subtitle } = require('../models/subtitle');
const DomainError = require("../error/domainError");
const { Video } = require('../models/video');
const { Exercise } = require('../models/exercise');
const { question } = require('../models/question');
var subtitlesArray = [subtitleSchema];
var Totalhrs = 0;


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

    async changePassword ({

        userId, oldPassword, newPassword
    }) {
        try {
            
            const user = await Account.findOne({ _id: userId }).catch(() => {
                throw new DomainError("Wrong Id", 400)
            });
            if(user.password == oldPassword){
                
                await Account.updateOne({_id:userId}, {password: newPassword})
            }
            else{
                throw new DomainError("Wrong Password", 400);
            }

        

        }
        catch (err) {
            throw new DomainError('error internally', 500);
        }

    },

    async editEmail ({

        userId, oldEmail, newEmail
    }) {
        try {
            
            const user = await Account.findOne({ _id: userId }).catch(() => {
                throw new DomainError("Wrong Id", 400)
            });
            console.log(oldEmail);
           if(user.email == oldEmail){


            let o = await Account.findOne({email: newEmail});
            console.log(o);
            if (o) {
                throw new DomainError("email already exits", 400);

            } else {

                await Account.updateOne({_id: userId}, {email: newEmail});

            }
            
            }
            else{
                throw new DomainError("You can not change your old email to new email", 400);
            }

        

        }
        catch (err) {
            throw new DomainError('error internally', 500);
        }

    },

    async editBiography ({

        userId, newText
    }) {
        try {
            
            const user = await Account.findOne({ _id: userId }).catch(() => {
                throw new DomainError("Wrong Id", 400)
            });

            await Account.updateOne({_id: userId}, {biography: newText});


        

        }
        catch (err) {
            throw new DomainError('error internally', 500);
        }

    },

    async addDiscount ({

        courseId, discount, discountDuration
    }) {
        try {
            
            const user = await Course.findOne({ _id: courseId }).catch(() => {
                throw new DomainError("Wrong Id", 400)
            });

            console.log(user);
            console.log(discount);
            console.log(discountDuration);


            await Course.updateOne({_id: courseId}, {discount: discount});
            await Course.updateOne({_id: courseId}, {discountDuration: discountDuration});


        

        }
        catch (err) {
            throw new DomainError('error internally', 500);
        }

    },

    async viewInstReview ({

        userId
    }) {
        try {
            console.log(userId);
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
                if (result3[i].subject.toString().includes(search) || result3[i].title.toString().includes(search)) {

                    final.push(result3[i]);

                }
                else {

                    for (var j = 0; j < result3[i].instructors.length; j++) {

                        if (result3[i].instructors[j].firstName.toString().includes(search) ||
                            result3[i].instructors[j].lastName.toString().includes(search) ||
                            result3[i].instructors[j].username.toString().includes(search)
                        ) {
                            final.push(result3[i])

                        }

                    }

                }


            }
            let details = countryPriceDetails.get(user.country);
            for (var i = 0; i < final.length; i++) {
                // price = price x factor x discount
                final[i].price = final[i].price * details.factor * ((100 - details.discount) / 100);
            }
            return { final, currency: details.currency };
        }
        catch (err) {
            throw new DomainError('error internally', 500);
        }


    },
    async getFilterResult({

        username, userId, subject, minPrice, maxPrice
    }) {

        try {
            const final = [];
            const final2 = [];

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

            let details = countryPriceDetails.get(user.country);
            for (var i = 0; i < result3.length; i++) {
                // price = price x factor x discount
                result3[i].price = result3[i].price * details.factor * ((100 - details.discount) / 100);
            }

            for (var i = 0; i < result3.length; i++) {
                if (result3[i].subject.toString().toLowerCase().includes(subject.toLowerCase())) {
                    final.push(result3[i]);

                }
                else if (subject == "") { final.push(result3[i]); }
            }


            for (j = 0; j < final.length; j++) {
                if (maxPrice != "" && minPrice == "") {
                    if (final[j].price <= parseInt(maxPrice)) {
                        final2.push(final[j]);
                    }
                }
                if (minPrice != "" && maxPrice == "") {

                    if (final[j].price >= parseInt(minPrice)) {
                        final2.push(final[j]);
                    }
                }
                if (minPrice != "" && minPrice != "") {
                    if (final[j].price >= parseInt(minPrice) && final[j].price <= parseInt(maxPrice)) {
                        final2.push(final[j]);
                    }
                }

                if (minPrice == "" && maxPrice == "") {
                    final2.push(final[j]);
                }
            }






            return { final2, currency: details.currency };
        }
        catch (err) {
            throw new DomainError('error internally', 500);
        }


    },



    async addsubtitle(subArray) {
        for (var i = 0; i < subArray.length; i++) {


            const sub = new Subtitle({
                text: subArray[i].text,
                hours: subArray[i].hours
            })
            await sub.save()
            subtitlesArray.push(sub);
        }
        return subtitlesArray

    },

    async calculateHours(subArray) {
        for (var i = 0; i < subArray.length; i++) {

            Totalhrs += subArray[i].hours;
        }
        return Totalhrs

    },


    async createcourse({ instructorId, subject, title, price, summary, subtitles, exercises, link }) {
        const thisInstructor = await Account.findOne({ _id: instructorId }).catch(() => {
            throw new DomainError("Wrong Id", 400)
        });
        try {
            Totalhrs = 0;
            const subtitlesArray = [];
            const exArray = [];
            const myArray = subtitles.split(",");
            const myArrayEx = exercises.split(",");
            for (var i = 0; i < myArray.length; i++) {
                var v = new Video({
                    title: myArray[i].split(":")[2].split(";")[0].toString(),
                    link: myArray[i].split(":")[2].split(";")[1].toString(),
                    description: myArray[i].split(":")[2].split(";")[2].toString(),

    
                })
                var s = new Subtitle({
                    text: myArray[i].split(":")[0].toString(),
                    hours: parseInt(myArray[i].split(":")[1]),
                    videoTitles: v
                })

                //s.save();
                subtitlesArray.push(s);
            }

            for (var j = 0; j < myArrayEx.length; j++) {
                var e = new Exercise({
                    title: myArrayEx[j].toString()
                })
                exArray.push(e);

            }


            const Newcourse = new Course({
                subject: subject,
                price: price,
                subtitles: subtitlesArray, ///should it be empty array as exercises --1....
                summary: summary,
                title: title,
                totalHours: 10,
                totalHours: await this.calculateHours(subtitlesArray),  ///--1 if so how total hours will be calculated....
                exercises: exArray,
                instructors: [thisInstructor],
                link: link
            })

            Newcourse.save();
        } catch (err) {
            if (err._message && err._message == 'Course validation failed') { throw new DomainError('validation Error', 400); }
            throw new DomainError('error internally', 500);


        }


    },

    async createQuestion({ exerciseId, mcq1,mcq2,mcq3,mcq4, correctAnswer,title, totalCredit}) {
        const thisExercise = await Exercise.findOne({ _id: exerciseId }).catch(() => {
            throw new DomainError("Wrong Id", 400)
        });
        try {
            const newQuestion = new question({
                questionText: title,
                mcqs:[mcq1,mcq2,mcq3,mcq4],
                correctAnswer:correctAnswer,
                totalCredit:totalCredit
            })
            await newQuestion.save()
            thisExercise.questions.push(newQuestion);
        
        } catch (err) {
            if (err._message && err._message == 'Course validation failed') { throw new DomainError('validation Error', 400); }
            throw new DomainError('error internally', 500);


        }


    },
    async createExercise({ instructorId, courseId, title}) {
        const thisInstructor = await Account.findOne({ _id: instructorId }).catch(() => {
            throw new DomainError("Wrong Id", 400)
        });
        const thisCourse = await Course.findOne({ _id: courseId }).catch(() => {
            throw new DomainError("Wrong Id", 400)
        });
        try {
            if(thisInstructor==thisCourse.instructors[0]){
            const newExercise = new Exercise({
                title: title,
            })
            await newExercise.save()
            thisCourse.exercises.push(newExercise);}
            else {
                throw new DomainError("Unauthorized", 400)
            }
        
        } catch (err) {
            if (err._message && err._message == 'Course validation failed') { throw new DomainError('validation Error', 400); }
            throw new DomainError('error internally', 500);


        }







    },



    async acceptContract({ courseId }){
        const thisCourse = await Course.findOne({ _id: courseId }).catch(() => {
            throw new DomainError("Wrong Id", 400)

});

try{
    thisCourse.contractStatus = true;
}
catch (err) {
            if (err._message && err._message == 'Course validation failed') { throw new DomainError('validation Error', 400); }
            throw new DomainError('error internally', 500);


        }


},



async rateInstructor (instructorId , userId , ratingNumber, ratingText){
try {

    const name = await Account.findOne({_id : userId},{firstName : 1 , lastName: 1, _id : 1, type: 1})  
   if (name.type == 'CORPORATE_TRAINEE'|| name.type == 'INDIVIDUAL_TRAINEE'){

    let query =  {id: name._id ,rating : ratingNumber , text: ratingText ,firstName : name.firstName , lastName: name.lastName}
   
    
    await InstructorToCourses.findOneAndUpdate({"account._id" : instructorId}, {"$pull": {"rating" : {id: query.id}}})

    const result = await InstructorToCourses.findOneAndUpdate({"account._id" : instructorId},
        {   "$push": { "rating": query }  },
        { "new": true, "upsert": true })
  

        let rate = 0;
        let count =0;
        for(count; count< result.rating.length;count++ ){
          rate+= result.rating[count].rating;
     
        }
        
        if ((count)==0){count = 1};
       let generalRating= (rate/count)>=0?(rate/count):0
     

        await InstructorToCourses.findOneAndUpdate({"account._id" : instructorId}, {generalRating:generalRating})

  
    }
    return;
    }
    catch(err){
        console.log(err)
        if (err instanceof DomainError) { throw err; }
        throw new DomainError('error internally', 500);
    }  

},

}

module.exports = instructorController;