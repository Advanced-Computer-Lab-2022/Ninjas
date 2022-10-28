const express = require("express");
const userController = require("../controllers/userController");
const userRouter = new express.Router();
const path = require('path');

userRouter.get('/', (req, res) => {
    // here we are telling the response to find the html file and send it as a response
    res.sendFile(path.resolve('views/homePage.html'));
});
userRouter.get('/selectCountryPage', (req,res) => {
    res.sendFile(path.resolve('views/selectCountry.html'));
})
userRouter.get('/search', async (req, res) => {
    const {
        userId, userType, subject, minPrice, maxPrice, rating, title, instructor, totalHours
    } = req.body;

    //snipped can be moved to controller
    if (userType == 'ADMIN' || !userType) {
        res.status(401).json({ message: "unauthorized user." });
    }

    const searchResults = await
        userController.getSearchResult({ userId, subject, minPrice, maxPrice, rating, title, instructor, totalHours });
    res.status(200).json({ result: searchResults });
})

userRouter.get('/viewAllCourses', async (req,res) => {
    //should return only the title, total hours, and rating
    const { courses } = await userController.getSearchResult({ userId: '635acedda1fea642e98ec4b3'}); //gets all courses
    res.write('<h1>Search results</h1> <hr>')
    let currentString; //this will be modified to be written in the response
    for (var i=0; i<courses.length; i++) {
        currentString = '<p> Course title: ' + courses[i].title + '<br>' +
        'Total hours: ' + courses[i].totalHours +'<br>' +
        'Rating: '+ courses[i].rating+'<br>' +
        '</p> <hr>';
        res.write(currentString);
    }
    res.status(200).send();

})

userRouter.post('/selectCountry', async (req,res) => {
    try {
    const { userId, selectedCountry } = req.body;
    if (!selectedCountry || !userId) {
        res.status(400).send('<h1>Please enter a country AND a user ID.</h1>')
    }

    await userController.changeUserCountry({ userId, selectedCountry });
    // status 201 "no_content" is usually rendered when the response does not have any data in it,
    // and is commonly used in cases where a record is updated.
    res.write('<h1> Country changed successfully </h1>')
    res.write('<p>your country is now '+ selectedCountry + '</p>')
    res.status(201).send();
} catch (error) {
    res.status(error.code).send(error.message);
}
})

module.exports = userRouter;
