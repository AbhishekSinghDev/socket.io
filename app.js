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

  setTimeout(() => {
    user.emit("new message", { message: "hey how are you doin!" });
  }, 3000);

  user.on("message from client to server", (data) => {
    console.log(data.message);
  });

  // setTimeout(() => {
  //   user.send("Sent through in-built event: message");
  // }, 3000);

  user.on("disconnect", () => {
    console.log("User Disconnected ID:", user.id);
  });
});

server.listen(3000, () => {
  console.log("server running on http://localhost:3000");
});
