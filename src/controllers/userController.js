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

        if (subject == null &&
            minPrice == null && maxPrice == null &&
            rating == null && title == null &&
            instructor == null && totalHours == null) {
            return await Course.find();
        }

        const user = await Account.findOne({ _id: userId }, { country: 1 });

        const courses = await Course.find({
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
        return courses;
    },

    async changeUserCountry({ userId, selectedCountry }) {
        //update the user's record in the database
        await Account.updateOne(
            { _id: userId }, // gets the user whose id is userId
            { country: selectedCountry } //changes the country to the selected one
        )
    }
}

module.exports = userController;