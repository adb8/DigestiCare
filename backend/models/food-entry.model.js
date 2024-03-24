const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodEntrySchema = new Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        size: {
            type: Number,
            required: true,
        },
        foods: {
            type: [String],
            required: true,
        },
        notes: {
            type: String,
            required: false,
            trim: true,
        },
        date: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const FoodEntry = mongoose.models.FoodEntry || mongoose.model("FoodEntry", FoodEntrySchema);
module.exports = FoodEntry;
