require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// const connectDB = require('./models/db');
const userRoutes = require("./routes");

const app = express();
const port = process.env.PORT;

// connectDB();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
