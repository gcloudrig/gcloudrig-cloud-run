const express = require("express");
const router = express.Router();
const expressJwt = require("express-jwt");
const spawn = require("child_process").spawn;

var processingCommand = false;

function isCommandRunning(req, res, next) {
  if (processingCommand) {
    res.status(409).send("command processing...");
  } else {
    next();
  }
}

router.use(
  expressJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }) // Handle JWT auth
);
router.use(isCommandRunning); //Make sure no other commands are running

//scale up instance
router.get("/up", (req, res) => {
  runCommand(`${__dirname}/../../scale-up.sh`, req.app.get("socketio"));
  res.sendStatus(200);
});

//scale down instance
router.get("/down", (req, res) => {
  runCommand(`${__dirname}/../../scale-down.sh`, req.app.get("socketio"));
  res.sendStatus(200);
});

//change region
router.post("/region", (req, res) => {
  res.sendStatus(200);
});

//get status
router.get("/status", (req, res) => {
  runCommand(`${__dirname}/../../status.sh`, req.app.get("socketio"));
  res.sendStatus(200);
});

//nuke and run
router.get("/destroy", (req, res) => {
  res.sendStatus(200);
});

router.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("invalid token");
  }
});

function runCommand(command, io) {

  var commandToSend = command.replace('..', '');
  commandToSend = commandToSend.replace('/', '');
  io.sockets.emit("command", commandToSend);

  processingCommand = true;
  var myProcess = spawn(command);
  myProcess.stdout.setEncoding("utf-8");
  
  myProcess.stdout.on("data", function (data) {
    io.sockets.emit("process_data", data);
    console.log(data);
  });

  myProcess.stderr.setEncoding("utf-8");
  myProcess.stderr.on("error", function (data) {
    io.sockets.emit("process_data", data);
    console.log(data);
  });

  myProcess.on("exit", () => {
    processingCommand = false;
    console.log("command complete");
  });
}

module.exports = router;
