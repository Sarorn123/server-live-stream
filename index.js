const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("sent_message", (back_message) => {
    socket.broadcast.emit("message", back_message);
  });

  socket.on("disconnect", () => {
    console.log("1 user dis");
  });
});

server.listen(process.env.PORT || 5000, () => {
  console.log("SERVER IS RUNING");
});
