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
module.exports = instructorRouter;