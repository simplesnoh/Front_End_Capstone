import React, { Component } from "react"
import "./Login.css"
import { Modal, Form, Button } from "semantic-ui-react"
import APIManager from '../modules/APIManager'


/*TODO: TASK DIVS
-add one large div
-send in each of the tasks as you add them
-Order them by group number
-Show Group number on task
-Add edit and delete function on each

*/

export default class TeamEditForm extends Component {

    state = {
     newTask: "",
     name: ""
      }

      handleFieldChange = (event) => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
      };

    handleEditTask = (evt) => {
    evt.preventDefault();
        const editedTask = {
        name: this.state.name,
        completed: this.state.completed,
        ownerId: this.state.ownerId,
        taskTypeId: this.state.taskTypeId,
        teamId: this.state.teamId,
        id: this.state.id
    };
    this.props
        .updateAPI(editedTask, "tasks")
        .then(() => this.props.handleClose())     
     }
    

    componentDidMount() {
    APIManager.get("tasks", this.props.task.id)
    .then(task => {
        this.setState({
        name: task.name,
        completed: task.completed,
        ownerId: task.ownerId,
        taskTypeId: task.taskTypeId,
        teamId: task.teamId,
        id: task.id
        });
    });
    }

    render() {
        return (
            <React.Fragment>
                 <Modal.Header>Edit Task</Modal.Header>
            <Modal.Content>
            <Form>
                <Form.Input onChange={this.handleFieldChange} id="name" label='Task' value={this.state.name} />
                <Button content='Edit' primary onClick={this.handleEditTask} />
                <Button content='Cancel' primary onClick={this.props.handleClose} />
            </Form>
            </Modal.Content>
          </React.Fragment>
        )
    }
}