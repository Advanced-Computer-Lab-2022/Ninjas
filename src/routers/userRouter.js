const express = require("express");
const userController = require("../controllers/userController");
const userRouter = new express.Router();

userRouter.get('/search', async (req, res) => {
    const {
        userId, userType, subject, minPrice, maxPrice, rating, title, instructor, totalHours
    } = req.body;

    //snipped can be moved to controller
    if (userType == 'ADMIN') {
        res.status(401).json({ message: "unauthorized user." });
    }

    const searchResults = await
        userController.getSearchResult({ userId, subject, minPrice, maxPrice, rating, title, instructor, totalHours });
    res.status(200).json({ result: searchResults });
})

userRouter.post('/selectCountry', async (req,res) => {
    const { userId, userType, selectedCountry } = req.body;

    //snipped can be moved to controller
    if (userType == 'ADMIN') {
        res.status(401).json({ message: "unauthorized user." });
    }

    await userController.changeUserCountry({ userId, selectedCountry });
    // status 201 "no_content" is usually rendered when the response does not have any data in it,
    // and is commonly used in cases where a record is updated.
    res.status(201).json({ message: "country changed successfully" });
})

module.exports = userRouter;