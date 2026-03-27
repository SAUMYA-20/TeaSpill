const express = require("express");
const mongoose = require("mongoose");
const teaRoutes = require("./routes/tea");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Tea DB connected"));

app.use("/api/tea", teaRoutes);

app.listen(5001, "0.0.0.0", () => {
  console.log("Tea Service running");
});