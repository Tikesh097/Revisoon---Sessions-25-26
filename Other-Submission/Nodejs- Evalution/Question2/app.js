const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(morgan("dev"));

//Routes
app.use("/auth", require("./routes/auth.routes"));
// app.use("/patient", require("./routes/patient.routes"));
// app.use("/doctor", require("./routes/doctor.routes"));
// app.use("/admin", require("./routes/admin.routes"));

module.exports = app;
