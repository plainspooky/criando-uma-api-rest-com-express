const express = require("express");
const morgan = require("morgan");

const app = express();

const students = require("./routes/students");

const SERVER_PORT = process.env.SERVER_PORT || 3000;

app.use(morgan("combined"));
app.use(express.static("public"));
app.use("/students", students);

app.listen(SERVER_PORT, ()=>{
  console.log(`Starting server at port ${SERVER_PORT}...`);
  console.log("Quit the server with <Control>+<C>.");
});
