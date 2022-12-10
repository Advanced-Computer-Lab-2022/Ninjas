const express = require("express");
var { sess } = require("../app");
const userController = require("../controllers/userController");
const router = new express.Router();


router.post('/signUp', async (req, res) => {
    try {

        const { username, firstName, lastName, email, password, gender } = req.body;

        const createdUser = await userController.signUp(
            { username, firstName, lastName, email, password, gender }
        );

        res.status(200).json(createdUser);

    } catch (error) {
        res.status(error.code).json({ message: error.message});
    }
})


module.exports = router;
