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
    console.log('fff');

    const searchResults = await
        userController.getSearchResult({ userId, subject, minPrice, maxPrice, rating, title, instructor, totalHours });
    res.status(200).json({ result: searchResults });
})

module.exports = userRouter;
