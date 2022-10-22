const Course = require("../models/courses");

const userController = {
    async getSearchResult({
        userId, subject,
        minPrice, maxPrice,
        rating, title,
        instructor, totalHours
    }) {
        // append to object the non null parameters

        const courses = await Course.find({
            subject: { $regex: "/^" + subject + "/" },
            rating,
            title: { $regex: "/^" + title + "/" },
            totalHours,
            instructors: { $in: [{ $regex: "/^" + instructor + "/" }] },
            price: { $range: [minPrice, maxPrice, 0.1] }
        });

        

        //for loop
        for (int i=0, i<courses.length, i++)
        {

        }

    }
}

module.exports = userController;