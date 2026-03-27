const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
require("./config/passport");

const authRoutes = require("./routes/auth");

const app = express();
app.use(express.json());

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Auth DB connected"));

app.use("/api/auth", authRoutes);

app.listen(5000, "0.0.0.0", () => {
  console.log("Auth Service running");
});