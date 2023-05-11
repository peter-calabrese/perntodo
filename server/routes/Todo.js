const express = require("express");
const router = express.Router();
const Todo = require("../db");

// Create a ToDo //
router.post("/todos", async (req, res) => {
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

router.get("/", async (req, res) => {
  try {
    const resp = await Todo.findAll();
    await res.json(resp);
  } catch (err) {
    console.log(err.message);
  }
});

// Get a ToDo //

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    res.json(todo);
  } catch (err) {
    console.log(err.message);
  }
});

// Update a ToDo //

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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

module.exports = router;
