import React, { useState } from "react";
import "./EditTodo.css";
const EditTodo = ({ todo }) => {
  const [description, setDescription] = useState(todo);
  const [showEdit, setShowEdit] = useState(false);
  const editTodo = async (todo_id) => {
    console.log(todo_id);
    const body = { description };
    const editTodo = await fetch(`http://localhost:3001/todos/${todo_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    // setShowEdit(false);
    window.location = "/";
  };
  return (
    <div>
      <button
        className="edit-button"
        onClick={() => setShowEdit(true)}
        data-target
      >
        Edit
      </button>
      {showEdit && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Update ToDo</h4>
            </div>
            <div className="modal-body">
              <input
                type="text"
                defaultValue={todo.description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                className="edit-button"
                onClick={() => editTodo(todo.todo_id)}
              >
                Edit
              </button>
              <button
                onClick={() => setShowEdit(false)}
                className="close-button"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditTodo;
