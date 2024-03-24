const router = require("express").Router();
let User = require("../models/user.model");
let FoodLog = require("../models/food-log.model");

router.route("/").post(async (req, res) => {
    let responseSent = false;
    const username = req.body.username;

    try {
        const user = await User.findOne({ username });
        const foodLogs = await FoodLog.find({ author: user._id });
        if (!responseSent) {
            responseSent = true;
            res.status(200).json({
                success: true,
                message: "Food logs retrieved successfully",
                data: foodLogs,
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

router.route("/post").post(async (req, res) => {
    let responseSent = false;
    const food = req.body.food;
    const type = req.body.type;
    const username = req.body.username;

    try {
        const user = await User.findOne({ username });
        const userId = user._id;
        const newFoodLog = new FoodLog({
            food: food,
            type: type,
            author: userId,
        });
        await newFoodLog.save();
        if (!responseSent) {
            responseSent = true;
            return res.status(200).json({
                success: true,
                message: "Food log updated successfully",
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

router.route("/remove").post(async (req, res) => {
    let responseSent = false;
    const food = req.body.food;
    const type = req.body.type;
    const username = req.body.username;

    try {
        const user = await User.findOne({ username });
        const userId = user._id;
        await FoodLog.deleteOne({ author: userId, food: food, type: type });
        if (!responseSent) {
            responseSent = true;
            return res.status(200).json({
                success: true,
                message: "Food log updated successfully",
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
