const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const routes = require("./routes/index");
const { connectPassport } = require("./utils/Provide");
const passport = require("passport");
const { errorMiddleware } = require("./middlewares/errorMiddleware");
const cors = require("cors")


if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./config/config.env" });
}

//Using Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "development" ? false : true,
    httpOnly: process.env.NODE_ENV === "development" ? false : true,
    sameSite: process.env.NODE_ENV === "development" ? false : "none",
  },
}))

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());
app.enable("trust proxy");

connectPassport();

//routes
app.use(routes);

// Using Error Middleware
app.use(errorMiddleware);

module.exports = app;
