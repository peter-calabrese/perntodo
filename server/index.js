const express = require("express");
const app = express();
const cors = require("cors");

const todoRoute = require("./routes/Todo");

// middleware
app.use(cors());
app.use(express.json()); // gives access to req.body

app.use("/todos", todoRoute);

app.listen(3001, () => {
  console.log("Server has started on http://localhost:3001");
});
