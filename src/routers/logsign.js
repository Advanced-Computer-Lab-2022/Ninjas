const express = require("express");
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
        res.status(error.code).json(error.message);
    }
})

router.get('/login', async (req, res) => {
    try {
        //should be changed in the evaluation
        const maxAge = 3 * 24 * 60 * 60;
        const { username, password } = req.query;
        const { user, token } = await userController.login({ username, password });

        //unique identifier for key-value table of cookies
     
        const key = 'jwt';
        req.session.username = username;
        res.cookie(key, token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(error.code).json(error.message);
    }
})
module.exports = router;
