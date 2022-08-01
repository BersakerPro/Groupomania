const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const cors = require("cors");

//MIDDLEWARE
const { checkUser, requireAuth } = require("./middleware/auth.middleware");

const app = express();

const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");

//CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: ["sessionId"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//JWT
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

//ROUTES
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

module.exports = app;
