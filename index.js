require("dotenv").config();
const app = require("./app");
const server = require("http").createServer(app);
const PORT = 8080;
const mongoose = require("mongoose");

//Defining global io for socket
global.io = require("socket.io")(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  console.log("socket connected");
});

io.on("error", (err) => {
  console.log(err);
});

server.listen(PORT, () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log("Connected Successfully To MongoDB "))
    .catch(() => console.error("Not Connected"));
  console.log(`Listening on port: ${PORT}`);
});
