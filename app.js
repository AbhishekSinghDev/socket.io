import express from "express";
import http from "node:http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// middlewares
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

// Rooms
let roomno = 1;
let maxuser = 0;

io.on("connection", (user) => {
  console.log("New User Connected ID:", user.id);

  // creating channel or room
  maxuser++;
  user.join(`room ${roomno}`);
  // firing an event inside the room
  io.sockets
    .in(`room ${roomno}`)
    .emit("new connection", `You are connected to room no ${roomno}`);

  if (maxuser >= 2) {
    maxuser = 0;
    roomno++;
  }

  user.on("disconnect", () => {
    console.log("User Disconnected ID:", user.id);
  });
});

server.listen(3000, () => {
  console.log("server running on http://localhost:3000");
});
