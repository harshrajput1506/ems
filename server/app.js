require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/", require("./routes/routes"));

//Handle Errors
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    success: 0,
    error: {
      message: error.message,
    },
  });
});

const port = process.env.APP_PORT || 8000;
app.listen(port, () => {
  console.log("Server up and running on port", port);
});

