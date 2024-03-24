const router = require("express").Router();
let User = require("../models/user.model");

router.route("/add").post(async (req, res) => {
    let responseSent = false;
    const username = req.body.username;
    const password = req.body.password;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser && !responseSent) {
            responseSent = true;
            return res.status(200).json({
                success: false,
                message: "Username in use",
            });
        }
        const newUser = new User({ username, password });
        await newUser.save();
        if (!responseSent) {
            responseSent = true;
            res.status(200).json({
                success: true,
                message: "Signup successful",
            });
        }
    } catch (error) {
        if (!responseSent) {
            responseSent = true;
            res.status(400).json({
                success: false,
                message: "Error: " + error,
            });
        }
    }
});

router.route("/login").post(async (req, res) => {
    let responseSent = false;
    const username = req.body.username;
    const password = req.body.password;

    try {
        const user = await User.findOne({ username });
        if (user && user.password === password && !responseSent) {
            responseSent = true;
            return res.status(200).json({
                success: true,
                message: "Login successful",
            });
        }
        if (!responseSent) {
            responseSent = true;
            return res.status(200).json({
                success: false,
                message: "Incorrect credentials",
            });
        }
    } catch (error) {
        if (!responseSent) {
            responseSent = true;
            return res.status(400).json({
                success: false,
                message: "Error: " + error,
            });
        }
    }
});

module.exports = router;
