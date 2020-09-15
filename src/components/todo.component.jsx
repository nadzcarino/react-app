import React from "react";

const Todo = ({ todo }) => {
  return (
    <tr>
      <td>
        <input type="radio" name="itemCheck" id="itemCheck" />
      </td>
      <td>{todo.description}</td>
      <td>{todo.responsible}</td>
      <td>{todo.priority}</td>
    </tr>
  );
};

export default Todo;
