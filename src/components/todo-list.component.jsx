import React from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./static/css/todo-list.css";
class TodosList extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      selectedTodo: null,
    };

    this.handleSelectTodo = this.handleSelectTodo.bind(this);
  }

  isCompleted(e) {
    const isCompleted = e.completed ? "Completed" : "Not Completed";
    return <span>{isCompleted}</span>;
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/todos")
      .then((res) => {
        this.setState({ todos: res.data });
      })
      .catch((error) => console.log(error));
  }

  handleSelectTodo(e) {
    this.setState({ selectedTodo: e.value });
  }

  render() {
    return (
      <>
        <DataTable
          className="table table-bordered"
          value={this.state.todos}
          selection={this.state.selectedTodo}
          paginator
          rows={5}
          onSelectionChange={this.handleSelectTodo}
          dataKey="_id"
        >
          <Column
            className="thead-dark"
            selectionMode="single"
            headerStyle={{ width: "3em" }}
          ></Column>
          <Column field="description" header="Description" sortable></Column>
          <Column field="responsible" header="Responsible" sortable></Column>
          <Column field="priority" header="Priority" sortable></Column>
          <Column
            body={this.isCompleted}
            field="completed"
            header="Status"
            sortable
          ></Column>
        </DataTable>
        <div class="row">
          <button className="btn btn-primary">Edit</button>
          <button className="btn btn-warning">Delete</button>
          <button className="btn btn-success">Create</button>
        </div>
      </>
    );
  }
}

export default TodosList;
