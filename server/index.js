const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json()); // gives access to req.body

// ROUTES //

// Create a ToDo //

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;

    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// Get All ToDos //

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// Get a ToDo //

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const allTodos = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(allTodos.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// Update a ToDo //

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json("Update Successful!");
  } catch (err) {
    console.log(err.message);
  }
});

// Delete a ToDo //

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});
app.listen(3001, () => {
  console.log("Server has started on http://localhost:3000");
});
