// importing dependencies
const express = require("express");
var morgan = require("morgan");
const multer = require("multer");
var cors = require("cors");

// importing local dependencies
const authRouter = require("./routes/auth");
const taskRouter = require("./routes/Task");
const applicationRouter = require("./routes/application");
const profileRouter = require("./routes/profile");
const search = require("./routes/search");
const favouriteTasks = require("./routes/favourite");
const serviceRouter = require("./routes/service");
const upload = multer();

// app & middlewares
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(upload.any());

// defining routes
app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);
app.use("/api/task", applicationRouter);
app.use("/api/task", search);
app.use("/api/profile", profileRouter);
app.use("/api/task", favouriteTasks);
app.use("/api/service", serviceRouter);

// app listening/serving
const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log(`Express is Serving ✅ on port ${PORT}`);
});
