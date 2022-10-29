const DomainError = require("../error/domainError");
const { Account } = require("../models/account");
const { Course, countryPriceDetails } = require("../models/courses");
const { Exercise } = require("../models/exercise");

const userController = {


    async getSearchResult({
        userId = null, subject = null,
        minPrice = null, maxPrice = null,
        rating = null, title = null,
        instructor = null, totalHours = null
    }) {

   
try{
        const user = await Account.findOne({ _id: userId }, { country: 1 }).catch(()=>{
        throw new DomainError("Wrong Id",400)});

         
      let courses;
        if   (subject == "null"  &&
            rating =="null" && title == '' &&
            instructor == ''  ){
                 courses =  await Course.find() }else{

         let queryArray=[];
         if (subject != "null"){queryArray.push( { subject: { '$regex': "" + subject , '$options': 'i' } })}
         if (rating != "null"){queryArray.push(   { rating: rating })}
         if (title != ''){queryArray.push(  { title: { '$regex': "" + title , '$options': 'i' } })}
         if (instructor != ''){queryArray.push(   {  instructors: { $elemMatch: {'$or':[ {firstName: { '$regex': "" + instructor , '$options': 'i' }},
         {lastName: { '$regex': "" + instructor , '$options': 'i' }}] }  } })}
               
       //  console.log(queryArray)
         
         courses =   await Course.find({
            '$and': queryArray
        });
    }

        let details = countryPriceDetails.get(user.country);
        for (var i = 0; i < courses.length; i++) {
            // price = price x factor x discount
            courses[i].price = courses[i].price * details.factor * ((100 - details.discount) / 100);
            if (minPrice != "null"&& courses[i].price<minPrice){
                courses.splice(i, 1);
            }
            if (maxPrice != "null"&& courses[i].price>maxPrice){
                courses.splice(i, 1);
            }
        }
      //  console.log(courses);
        return {courses,currency:details.currency};
    }
    catch(err){
        //console.log(err);
        if (err instanceof DomainError ){throw err;}
        throw new DomainError('error internally',500);  
    }
    },








    async changeUserCountry({ userId, selectedCountry }) {
        //update the user's record in the database
        try {

        const thisUserType = await Account.findOne({ _id: userId }, { type:1 }).catch(()=>{
            throw new DomainError("Wrong Id",400)});
        //admins should not change their country
        if (thisUserType.type == 'ADMIN')
        throw new DomainError("Unauthorized user: Admin", 401)

        await Account.updateOne(
            { _id: userId }, // gets the user whose id is userId
            { country: selectedCountry } //changes the country to the selected one
        );

        } catch (error) {
            console.log(error)
            if (error.name == 'ValidationError') {
                const errorMessages = Object.values(error.errors).map(val => val.message);
                throw new DomainError(errorMessages, 400);
            }
            if (error.code == 401 ) { //unauthorized user
                throw new DomainError("Unauthorized user: Admin", 401)
            }
            else {
                throw new DomainError("internal error", 500);
            }
        }
    }
}

module.exports = userController;