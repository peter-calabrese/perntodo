const express = require("express");
const app = express();
const cors = require("cors");
const Todo = require("./db");

// middleware
app.use(cors());
app.use(express.json()); // gives access to req.body

// ROUTES //

// Create a ToDo //

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;

    const newTodo = await Todo.create({
      description: description,
    });
    res.json(newTodo);
  } catch (err) {
    console.log(err.message);
  }
});

// Get All ToDos //

app.get("/todos", async (req, res) => {
  try {
    const resp = await Todo.findAll();
    await res.json(resp);
  } catch (err) {
    console.log(err.message);
  }
});

// Get a ToDo //

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    res.json(todo);
  } catch (err) {
    console.log(err.message);
  }
});

// Update a ToDo //

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const oldTodo = await Todo.findByPk(id);
    await Todo.update(
      { description: description },
      {
        where: {
          todo_id: id,
        },
      }
    );
    await res.json({
      status: "successful!",
      "Old Description": oldTodo.description,
      "Updated Description": description,
    });
  } catch (err) {
    console.error(err.message);
  }
});

// Delete a ToDo //

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.destroy({
      where: {
        todo_id: id,
      },
    });

    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(3001, () => {
  console.log("Server has started on http://localhost:3001");
});
