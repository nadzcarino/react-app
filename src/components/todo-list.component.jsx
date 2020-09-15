import React from "react";
import axios from "axios";
import Todo from "./todo.component";

class TodosList extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/todos")
      .then((res) => {
        this.setState({ todos: res.data });
      })
      .catch((error) => console.log(error));
  }

  todoList() {
    return this.state.todos.map((todo, index) => (
      <Todo todo={todo} key={index} />
    ));
  }

  render() {
    return (
      <div>
        <h3>Todos List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Action</th>
              <th>Description</th>
              <th>Responsible</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
          {this.todoList()}
          </tbody>
        </table>
        <button type="button" class="btn btn-outline-primary">Edit</button>
      </div>
    );
  }
}

export default TodosList;
