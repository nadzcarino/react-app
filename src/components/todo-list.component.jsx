import React from "react";
import axios from "axios";
import Todo from "./todo.component";
import { Link } from "react-router-dom";

class TodosList extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      selectedTodo: null,
    };

    this.handleSelectTodo = this.handleSelectTodo.bind(this);
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
      <Todo todo={todo} key={index} selectTodo={this.handleSelectTodo} />
    ));
  }

  handleSelectTodo(selectedTodo) {
    this.setState({ selectedTodo: selectedTodo });
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
          <tbody>{this.todoList()}</tbody>
        </table>
        <Link className="btn btn-outline-primary" to={{ pathname: "/create/", selectedTodo: this.state.selectedTodo }}>
          Edit
        </Link>
      </div>
    );
  }
}

export default TodosList;
