// importing dependencies
const express = require("express");

// importing local dependencies
const authRouter = require("./routes/auth");

// app & middlewares
const app = express();
app.use(express.json());

// defining routes
app.use("/api/auth", authRouter);

// app listening/serving
app.listen(3000, () => {
  console.log("express is working");
});
