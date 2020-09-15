import React from "react";

const Todo = ({ todo, selectTodo }) => {
  const handleSelectTodo = () => {
    selectTodo(todo);
  };

  return (
    <tr>
      <td>
        <input
          type="radio"
          name="itemCheck"
          id="itemCheck"
          onChange={handleSelectTodo}
        />
      </td>
      <td>{todo.description}</td>
      <td>{todo.responsible}</td>
      <td>{todo.priority}</td>
    </tr>
  );
};

export default Todo;
