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

let users = 0;

io.on("connection", (user) => {
  console.log("New User Connected ID:", user.id);
  users++;

  user.emit("newuserconnect", { message: "Hi, Welcome to stream bro!" });

  // Broadcasting
  // io.sockets.emit("broadcast", { message: `${users} users connected` });

  // this broadcast be only shown to those people who are already connected right now.
  user.broadcast.emit("newuserconnect", {
    message: `${users} users connected`,
  });

  user.on("disconnect", () => {
    console.log("User Disconnected ID:", user.id);

    users--;
    // io.sockets.emit("broadcast", { message: `${users} users connected` });
    user.broadcast.emit("newuserconnnect", {
      message: `${users} users connected`,
    });
  });
});

server.listen(3000, () => {
  console.log("server running on http://localhost:3000");
});
