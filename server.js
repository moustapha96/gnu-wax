const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// const cors = require("cors");
require("./config/db");
require("dotenv").config({ path: "./config/.env" });
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// jwt
app.get("*", checkUser);

//route principal
app.get("/", (req, res) => {
  res.status(200).send("bienvenue");
});

app.get("/api/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

//route
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

//server
app.listen(process.env.PORT, () => {
  console.log(`listenning on port ${process.env.PORT} `);
});
