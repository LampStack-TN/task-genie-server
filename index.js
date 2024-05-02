// importing dependencies
const express = require("express");
var morgan = require("morgan");
const multer = require("multer");
var cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

// importing local dependencies
const authRouter = require("./routes/auth");
const taskRouter = require("./routes/Task");
const applicationRouter=require("./routes/application")
const profileRouter=require("./routes/profile")
const search = require("./routes/search")
const favouriteTasks=require("./routes/favourite")
const serviceRouter=require('./routes/service')
const hiringRouter=require('./routes/hiring')
const chatRouter = require("./routes/chat");
const upload = multer();

// app & middlewares
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(upload.any());
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:8081",
  },
});

// defining routes
app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);
app.use("/api/task",applicationRouter)
app.use("/api/task",search)
app.use("/api/profile",profileRouter)
app.use("/api/task",favouriteTasks)
app.use("/api/service",serviceRouter)
app.use("/api/hiring",hiringRouter)
app.use("/api/chat", chatRouter);

// app listening/serving
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("sendMessage", (message) => {
    console.log(message, "✏️✏️✏️");
    // Broadcast the received message to all connected clients
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
// app listening/serving
const PORT = process.env.PORT || 3000;

server.listen(3000, () => {
  console.log(`Express is Serving ✅ on port ${PORT}`);
});
