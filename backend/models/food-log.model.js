const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodLogSchema = new Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        food: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const FoodLog = mongoose.models.FoodLog || mongoose.model("FoodLog", FoodLogSchema);
module.exports = FoodLog;
