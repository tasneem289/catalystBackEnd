const express = require("express");
const app = express();
const db = require("./db.js");
const cors = require("cors");
const compression = require("compression");
app.use(cors());
app.use(express.json());
app.use(compression());
const projectRouter = require("./router/project-router.js");
const usersRouter = require("./router/auth-router.js");
const stockRouter = require("./router/stock-router.js");
app.use("/api/projects", projectRouter);
app.use("/api/users", usersRouter);
app.use("/api/stocks", stockRouter);

app.all("*", (req, res, next) => {
  return res
    .status(404)
    .json({ status: "errorr", message: "invalid complete path" });
});

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.statusText || "error",
    message: error.message,
    code: error.statusCode || 500,
    data: null,
  });
});

app.listen(5000, () => {
  console.log("listening on port:5000!");
});
