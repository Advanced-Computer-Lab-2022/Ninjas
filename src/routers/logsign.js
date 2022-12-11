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
router.post('/forgotPassword', async (req, res) => {
    //if we will use react frontend, we will only need the username or the userId.
    //assuming that the user clicks "forgot my password" then we ask them for their username,
    //we will fetch the database to get the user type, email, etc.

    try {
        //get the username from the request
        const username = req.body.username;
        if (username == null || username.trim().length === 0) {
            //this means that the username is either not entered
            //or it was just a string of white spaces -- the trim method figures this out.
            return res.status(400).json({ message: "Please enter your username." });
        }
        await userController.forgotMyPassword({ username });

        //if the email is sent successfully, we will tell the frontend to display the message.
        res.status(200).json({ message: "A reset password email has been sent. Please check your email. " });
    } catch (error) {
        res.status(error.code).json({ message: error.message });
    }
})

router.post('/resetPassword/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const password = req.body.password;
        await userController.resetPassword({ userId, password });
        res.status(201).json({ message: "Your password has been reset successfully." });
        
    } catch (error) {
        res.status(error.code).json({ message: error.message });
    }
})

module.exports = router;
