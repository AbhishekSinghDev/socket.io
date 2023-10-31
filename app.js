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

io.on("connection", (user) => {
  console.log("New User Connected ID:", user.id);

  user.on("disconnect", () => {
    console.log("User Disconnected ID:", user.id);
  });
});

server.listen(3000, () => {
  console.log("server running on http://localhost:3000");
});
