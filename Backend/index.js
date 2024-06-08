const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const taskRoutes = require("./routes/taskRoute");
const cors = require('cors');

// Middleware
app.use((req, res, next) => {
  console.log("path " + req.path + " method " + req.method);
  next();
});

app.use(cors());
app.use(express.json());

// Debugging: Check if environment variables are loaded correctly
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('PORT:', process.env.PORT);

// DB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        "DB connected successfully and listening on port " + process.env.PORT
      );
    });
  })
  .catch((error) => console.log('DB connection error:', error));

app.use("/api/tasks", taskRoutes);
