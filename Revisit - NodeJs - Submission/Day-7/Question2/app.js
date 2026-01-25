const express = require("express");
const publicRoutes = require("./routes/public.routes");
const secureRoutes = require("./routes/secure.routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());

app.use("/public", publicRoutes);
app.use("/secure", secureRoutes);

app.use(errorHandler);

module.exports = app;
