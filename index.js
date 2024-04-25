// importing dependencies
const express = require("express");
var morgan = require("morgan");
var cors = require("cors");
// importing local dependencies
const authRouter = require("./routes/auth");
const taskRouter = require("./routes/Task");
const applicationRouter=require("./routes/application")
const profileRouter=require("./routes/profile")
// app & middlewares
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// defining routes
app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);
app.use("/api/task",applicationRouter)
app.use("/api/profile",profileRouter)
// app listening/serving
app.listen(3000, () => {
  console.log("Express is Serving ✅ on port 3000");
});
