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
const applicationRouter = require("./routes/application");
const profileRouter = require("./routes/profile");
const search = require("./routes/search");
const favouriteTasks = require("./routes/favourite");
const serviceRouter = require("./routes/service");
const hiringRouter = require("./routes/hiring");

const ratingRouter = require("./routes/rating");

const chatRouter = require("./routes/chat");
const adminRouter = require("./routes/admin/admin");
const notificationRouter = require("./routes/notification");
// app & middlewares
const upload = multer();
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(upload.any());
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:8081",
  },
});

// defining routes
app.use("/api/favrourite-task", favouriteTasks);
app.use("/api/task-application", applicationRouter);
app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);
app.use("/api/searchList", search);
app.use("/api/profile", profileRouter);
app.use("/api/service", serviceRouter);
app.use("/api/hiring", hiringRouter);
app.use("/api/rating", ratingRouter);
app.use("/api/chat", chatRouter);
app.use("/api/admin", adminRouter);
app.use("/api/notification", notificationRouter);


// app listening/serving
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinConversation", (conversationId) => {
    console.log(`Joining conversation ${conversationId}`);
    // Join the room corresponding to the conversationId
    socket.join(conversationId);
  });

  socket.on("sendMessage", (message) => {
    console.log(message, "✏️✏️✏️");
    // Broadcast the received message to all connected clients
    socket.to(message.conversationId).emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
// app listening/serving
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Express is Serving ✅ on port ${PORT}`);
});
