import React from "react";
import axios from "axios";

class CreateTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      responsible: "",
      priority: "",
      completed: false,
      _id: null,
    };

    this.onChangeDesciption = this.onChangeDesciption.bind(this);
    this.onChangeResponsible = this.onChangeResponsible.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
    this.onChangeComplete = this.onChangeComplete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  setDefaultValue() {
    const { selectedTodo } = this.props.location;
    if (selectedTodo) {
      this.setState({
        description: selectedTodo.description,
        responsible: selectedTodo.responsible,
        priority: selectedTodo.priority,
        completed: selectedTodo.completed,
        _id: selectedTodo._id,
      });
    }
  }
  onChangeDesciption(e) {
    this.setState({ description: e.target.value });
  }

  onChangeResponsible(e) {
    this.setState({ responsible: e.target.value });
  }

  onChangePriority(e) {
    this.setState({ priority: e.target.value });
  }

  onChangeComplete(e) {
    this.setState({ completed: !this.state.completed });
  }

  onSubmit(e) {
    e.preventDefault();

    const { _id, description, responsible, priority, completed } = this.state;
    const newTodo = {
      description: description,
      responsible: responsible,
      priority: priority,
      completed: completed,
    };

    if(_id) {
      axios
      .post(`http://localhost:4000/todos/update/${_id}`, newTodo)
      .then((res) => {
        this.props.history.push("/")
      })
      .catch((error) => console.error(error));
    }
    else {
      axios
      .post("http://localhost:4000/todos/add", newTodo)
      .then((res) => {
        this.props.history.push("/")
      })
      .catch((error) => console.error(error));
    }


    this.setState({
      description: "",
      responsible: "",
      priority: "",
      completed: false,
    });


  }

  componentDidMount() {
    this.setDefaultValue();
  }
  render() {
    const showCompleted = () => {
      if (this.state._id) {
        return (
          <div className="form-check">
            <input
              className="form-check-input"
              id="completedCheckbox"
              type="checkbox"
              name="completedCheckbox"
              onChange={this.onChangeComplete}
              checked={this.state.completed}
            />
            <label className="form-check-label" htmlFor="completedCheckbox">
              Completed
            </label>
          </div>
        );
      }
    };
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Create New Todo</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDesciption}
            />
          </div>
          <div className="form-group">
            <label>Responsible: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.responsible}
              onChange={this.onChangeResponsible}
            />
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                value="Low"
                checked={this.state.priority === "Low"}
                onChange={this.onChangePriority}
              />
              <label className="form-check-label">Low</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                value="Medium"
                checked={this.state.priority === "Medium"}
                onChange={this.onChangePriority}
              />
              <label className="form-check-label">Medium</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                value="High"
                checked={this.state.priority === "High"}
                onChange={this.onChangePriority}
              />
              <label className="form-check-label">High</label>
            </div>
          </div>
          {showCompleted()}

          <br />
          <div className="form-group">
            <input
              type="submit"
              value="Create Todo"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateTodo;
