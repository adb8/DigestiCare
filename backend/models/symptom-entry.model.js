const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SymptomEntrySchema = new Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        severity: {
            type: Number,
            required: true,
        },
        symptoms: {
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

const SymptomEntry = mongoose.models.SymptomEntry || mongoose.model("SymptomEntry", SymptomEntrySchema);
module.exports = SymptomEntry;
