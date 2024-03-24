const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
module.exports = User;
