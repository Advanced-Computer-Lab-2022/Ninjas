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
        console.log('heheee');

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
        console.log(courses);

        let details = countryPriceDetails.get(user.country);
        console.log(details);
        for (var i = 0; i < courses.length; i++) {
            // price = price x factor x discount
            courses[i].price = courses[i].price * details.factor * ((100 - details.discount) / 100);
        }
        return courses;
    }
}

module.exports = userController;