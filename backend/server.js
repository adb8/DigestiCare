const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { dbName: "digesticare", useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});

const usersRouter = require("./routes/users.route");
app.use("/users", usersRouter);

const apiRouter = require("./routes/api.route");
app.use("/api", apiRouter);

const entryRouter = require("./routes/entries.route");
app.use("/entries", entryRouter);

const logsRouter = require("./routes/logs.route");
app.use("/logs", logsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
