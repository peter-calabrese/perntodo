import React, { useState } from "react";
import "./InputTodo.css";
const InputTodo = () => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:3001/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className="container">
      <h1 className="header-text">Input Todo</h1>
      <form className="input-form" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="input-text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <button className="btn-add">Add</button>
      </form>
    </div>
  );
};

export default InputTodo;
