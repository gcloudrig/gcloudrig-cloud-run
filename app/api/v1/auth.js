const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (
    password == process.env.API_PASSWORD &&
    username == process.env.API_USERNAME
  ) {
    //Maybe need to make more secure but we have to put password into env var anyway when we create the function

    const accessToken = jwt.sign(
      { username: username },
      process.env.JWT_SECRET
    );
    res.json({
      accessToken,
    });
  } else {
    res.status(401).send("username or password incorrect");
  }
});

router.get("/validate", expressJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }), (req, res) => {
  res.send({ status: "valid token" });
});

router.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("invalid token");
  }
});

module.exports = router;
