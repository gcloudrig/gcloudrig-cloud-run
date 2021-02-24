const express = require("express");
const app = express();
const server = require("http").Server(app);
const cors = require("cors");
const commandRoutes = require("./v1/commands");
const authRoutes = require("./v1/auth");
var bodyParser = require('body-parser');

const PORT = process.env.PORT;
const HOST = "0.0.0.0";

const socketioJwt = require("socketio-jwt");

const io = require("socket.io")(server, {
  cors: {
    origins: "*",
    methods: ["GET", "POST"]
  }
});
io.use(
  socketioJwt.authorize({
    secret: process.env.JWT_SECRET,
    handshake: true,
  })
);
app.set('socketio', io);

app.use(cors());
app.use(bodyParser.json());

app.use("/v1/run", commandRoutes);
app.use("/v1/auth", authRoutes);

app.get('*.*', express.static(`${__dirname}/../dashboard/dist/dashboard`));

app.all('*', function (req, res) {
    res.status(200).sendFile(`/`, {root: `${__dirname}/../dashboard/dist/dashboard`});
});

server.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
