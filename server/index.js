const express = require("express");
const app = express();
const cors = require("cors");
const models = require("./src/models/");
const { Todo } = models.default;
// middleware
app.use(cors());
app.use(express.json()); // gives access to req.body

// ROUTES //

// Create a ToDo //

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await Todo.create({ description });
    console.log(newTodo);
    res.json(newTodo.toJSON());
  } catch (err) {
    console.log(err.message);
  }
});

// Get All ToDos //

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await Todo.findAll();
    const json = allTodos.map((todo) => todo.toJSON());
    res.json(json);
  } catch (err) {
    console.log(err.message);
  }
});

// Get a ToDo //

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    res.json([todo.toJSON()]);
  } catch (err) {
    console.log(err.message);
  }
});

// Update a ToDo //

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const todo = await Todo.findByPk(id);
    if (todo != null) {
      todo.description = description;
      await todo.save();
    }
    res.json("Update Successful!");
  } catch (err) {
    console.log(err.message);
  }
});

// Delete a ToDo //

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    if (todo != null) {
      await todo.destroy();
    }
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});
app.listen(3001, () => {
  console.log("Server has started on http://localhost:3000");
});
