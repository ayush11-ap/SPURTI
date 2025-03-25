const express = require("express");
const connectDB = require("./db/database");
const userRouter = require("./routes/user.routes");

const app = express();

const cookieParser = require("cookie-parser");

require('dotenv').config();


//Middleware
app.use(express.json());
app.use(cookieParser());

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

app.use("/user", userRouter);

connectDB()
  .then(() => {
    console.log("Database Connected Successfully");
    app.listen(1111, () => {
      console.log("Server is running on port 1111");
    });
  })
  .catch((err) => {
    console.log("Error in database connection");
    console.log(err);
  });
