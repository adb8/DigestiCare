const router = require("express").Router();
let symptomsList;
require("../util/web-scraper")().then((symptoms) => {
    symptomsList = symptoms;
});

router.route("/food").post(async (req, res) => {
    let responseSent = false;
    const query = req.body.query;
    const limit = req.body.limit;

    try {
        const response = await fetch(
            `https://api.edamam.com/auto-complete?app_id=7f02c0f8&app_key=06b617201abe3adda83e8502e0cf5034&q=${query}&limit=${limit}`
        );
        const foods = await response.json();
        const capitalizedFoods = foods.map((food) => food.charAt(0).toUpperCase() + food.slice(1));
        if (!responseSent) {
            responseSent = true;
            res.status(200).json({
                success: true,
                message: "Foods retrieved",
                foods: capitalizedFoods,
            });
        }
    } catch (error) {
        if (!responseSent) {
            responseSent = true;
            res.status(400).json({
                success: false,
                message: "Error: " + error,
                foods: [],
            });
        }
    }
});

router.route("/symptom").post(async (req, res) => {
    let responseSent = false;
    const query = req.body.query;
    const limit = req.body.limit;

    try {
        const filteredSymptoms = symptomsList.filter((symptom) => symptom.toLowerCase().includes(query.toLowerCase()));
        if (!responseSent) {
            responseSent = true;
            res.status(200).json({
                success: true,
                message: "Symptoms retrieved",
                symptoms: filteredSymptoms.slice(0, limit),
            });
        }
    } catch (error) {
        if (!responseSent) {
            responseSent = true;
            res.status(400).json({
                success: false,
                message: "Error: " + error,
                symptoms: [],
            });
        }
    }
});

module.exports = router;
