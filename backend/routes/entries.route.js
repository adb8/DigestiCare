const router = require("express").Router();
let User = require("../models/user.model");
let FoodEntry = require("../models/food-entry.model");
let SymptomEntry = require("../models/symptom-entry.model");

router.route("/food").post(async (req, res) => {
    let responseSent = false;
    const foods = req.body.foods;
    const size = req.body.size;
    const notes = req.body.notes;
    const username = req.body.username;
    const date = req.body.date;

    try {
        const user = await User.findOne({ username });
        const userId = user._id;
        const newFoodEntry = new FoodEntry({ author: userId, size, foods, notes, date });
        await newFoodEntry.save();
        if (!responseSent) {
            responseSent = true;
            res.status(200).json({
                success: true,
                message: "Food entry added successfully",
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

router.route("/symptom").post(async (req, res) => {
    let responseSent = false;
    const symptoms = req.body.symptoms;
    const severity = req.body.severity;
    const notes = req.body.notes;
    const username = req.body.username;
    const date = req.body.date;

    try {
        const user = await User.findOne({ username });
        const userId = user._id;
        const newSymptomEntry = new SymptomEntry({ author: userId, severity, symptoms, notes, date });
        await newSymptomEntry.save();
        if (!responseSent) {
            responseSent = true;
            return res.status(200).json({
                success: true,
                message: "Symptom entry added successfully",
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

router.route("/").post(async (req, res) => {
    let responseSent = false;
    const username = req.body.username;

    try {
        const user = await User.findOne({ username });
        const userId = user._id;
        const symptoms = await SymptomEntry.find({ author: userId });
        const foods = await FoodEntry.find({ author: userId });
        if (!responseSent) {
            responseSent = true;
            return res.status(200).json({
                success: true,
                message: "Entries retrieved successfully",
                foods: foods,
                symptoms: symptoms,
            });
        }
    } catch (error) {
        if (!responseSent) {
            responseSent = true;
            return res.status(400).json({
                success: false,
                message: "Error: " + error,
                foods: [],
                symptoms: [],
            });
        }
    }
});

module.exports = router;
