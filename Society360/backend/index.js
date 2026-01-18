require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/AuthRoute");

const PORT = process.env.PORT || 3005;
const uri = process.env.MONGO_URL;

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3001", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/", authRoute);
app.use('/api/visitors', require('./routes/VisitorRoute'));

app.listen(PORT, () => {
    console.log("App started");
    mongoose.connect(uri);
    console.log("DB connected");
});