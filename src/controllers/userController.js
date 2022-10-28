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
        const user = await Account.findOne({ _id: userId }, { country: 1 });
         console.log(user);
        const courses = 
          (subject == null  &&
            minPrice == "null" && maxPrice == "null" &&
            rating =="null" && title == null &&
            instructor == null && totalHours == null )?
            await Course.find() :
            await Course.find({
            '$or': [
                { subject: { '$regex': "/^" + subject + "/", '$options': 'i' } },
                { rating },
                { title: { '$regex': "/^" + title + "/", '$options': 'i' } },
                { totalHours },
                {
                    instructors: {
                        $elemMatch: { firstName: "/^" + instructor + "/" }
                    }
                },
                { price: { $gte: minPrice, $lte: maxPrice } }
            ]
        });
       

        let details = countryPriceDetails.get(user.country);
        for (var i = 0; i < courses.length; i++) {
            // price = price x factor x discount
            courses[i].price = courses[i].price * details.factor * ((100 - details.discount) / 100);
        }
        console.log(courses);
        return {courses,currency:details.currency};
    }
    catch(err){
        console.log(err);
    }
    },
    async changeUserCountry({ userId, selectedCountry }) {
        //update the user's record in the database
        try {

        const thisUserType = await Account.findOne({ _id: userId }, { type:1 });
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