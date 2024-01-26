import express from "express";
import { Server } from "socket.io";

const app = express();
const exressServer = app.listen(3000, () => {
  console.log("listening on port 3000");
});
const io = new Server(exressServer, {
  cors: "http://localhost:5173",
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("send-message", (message) => {
    socket.broadcast.emit("receive-message", message);
    // io.emit("receive-message", message);
    console.log(message);
  });
});
