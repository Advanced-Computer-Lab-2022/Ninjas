const express = require("express");
const instructorController = require("../controllers/instructorController");
const instructorRouter = new express.Router();

instructorRouter.get('/view', async (req, res) => {
    const { username
    } = req.body;

    // if (userType != 'Instructor') {
    //     res.status(401).json({ message: "unauthorized user." });
    // }



    const viewResults = await
        instructorController.getViewResult({ username });
    res.status(200).json({ result: viewResults });



})

instructorRouter.get('/Searchfilter', async (req, res) => {
    const { username
    } = req.body;

    // if (userType != 'Instructor') {
    //     res.status(401).json({ message: "unauthorized user." });
    // }



    const SearchResults = await
        instructorController.getSearchResult({ username, userId , title , subject , instructor , minPrice , maxPrice });
    res.status(200).json({ result: SearchResults });



})



module.exports = instructorRouter;