import React, { Component } from "react";
import "./Login.css";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment
} from "semantic-ui-react";
import TeamFormList from "./TeamFormList";

/*TODO:
 -Team name input
 -Number of people (6)
 -Add task form with drop down
 -Need drop down to populate the same number as members
 -Need to populate empty divs to represent groups
 -Added task needs to go into state and populate in div with edit/delete
 -Add trash task
 -Submit needs to add to API/link us to prize page
 -state:
 task: userId/name/completed/wheelId/taskTypeId
 wheel: completed/monthRound
 monthRound: teamId
*/

const options = [
  { key: "0m", text: "0", value: 0 },
  { key: "3m", text: "3", value: 3 },
  { key: "4m", text: "4", value: 4 },
  { key: "5m", text: "5", value: 5 },
  { key: "6m", text: "6", value: 6 }
];

export default class TeamForm extends Component {
  state = {
    memberValue: "",
    teamName: "",
    punishment: "",
    options,
    value: options[0].value,
    task: "",
    tasks: ""
  };

  handleSubmit = () => {
    const newTeam = {
      name: this.state.teamName,
      ownerId: this.props.teams.ownerId,
      teamMemberTotal: this.state.value,
      teamMemberAdd: 1,
      id: this.props.teams.id,
    };
    this.props
      .updateAPI(newTeam, "teams")
      .then(() => {
        const punishmentTask = {
          name: this.state.punishment,
          completed: false,
          ownerId: sessionStorage.getItem("team"),
          taskTypeId: 3,
          wheelId: this.props.wheel.id,
          teamId: this.props.teams.id
        };
        return this.props.addToAPI(punishmentTask, "tasks");
      })
      .then(() => {
        const teamRelationship = {
          userId: sessionStorage.getItem("team"),
          teamId: this.props.teams.id
        };
        return this.props.addToAPI(teamRelationship, "teamRelationship");
      })
      .then(() => {
        sessionStorage.setItem("members", this.state.value)
        sessionStorage.setItem("teamId", this.props.teams.id)
      })
    this.props.history.push("/PrizePhoto");
  };

  createTask = () => {
    const newTask = {
      name: this.state.task,
      completed: false,
      ownerId: sessionStorage.getItem("team"),
      taskTypeId: 2,
      teamId: this.props.teams.id,
      wheelId: this.props.wheel.id
    };
    this.props.addToAPI(newTask, "tasks");
    this.setState({ tasks: newTask });
    this.setState({ task: "" });
  };

  render() {
    const { value, options } = this.state;

    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            {/* <Image src='/logo.png' />*/} Make your team!
          </Header>
          <Form size="large">
            {/* <Segment stacked> */}
            <Form.Input
              fluid
              label="Team Name"
              onChange={e => this.setState({ teamName: e.target.value })}
            />
            <Form.Select
              fluid
              label="How Many Members?"
              options={options}
              value={value}
              placeholder="Pick A Number"
              onChange={(e, { value }) => this.setState({ value })}
            />

            <Form.Input
              fluid
              label="Task"
              value={this.state.task}
              onChange={e => this.setState({ task: e.target.value })}
            />

            <br />
            <Button color="teal" fluid size="large" onClick={this.createTask}>
              Add
            </Button>

            {this.state.tasks !== "" ? (
              <Segment>
                <TeamFormList
                  tasks={this.props.tasks}
                  teams={this.props.teams}
                  deleteFromAPI={this.props.deleteFromAPI}
                  updateAPI={this.props.updateAPI}
                />
              </Segment>
            ) : (
              <React.Fragment />
            )}
            <Form.Input
              fluid
              label="Pick A Punishment"
              onChange={e => this.setState({ punishment: e.target.value })}
            />

            <Button color="teal" fluid size="large" onClick={this.handleSubmit}>
              Start Your Team
            </Button>
            {/* </Segment> */}
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

// IN CASE I NEED TO LINK TEAM MEMBERS AND GROUPS AGAIN

// <label htmlFor="group">Group:</label>
//         <select defaultValue="" name="group" id="groupId"onChange={(e) => this.setState({groupNumber: e.target.value})}>
//             <option value="">Select a Group</option>
//             {this.state.options2}
//         </select>

// <Form.Select fluid label='How Many Members?' options={options} value={value} placeholder='Pick A Number' onChange={(e, {value}) => {
//     this.setState({value})
//     this.createOptions(value)}}/>

// createOptions = (value) => {
//     // let hello = <options key="560">Hello</options>
//     // this.setState({hello: hello})
//     let num = this.state.value
//     let options2 = []
//     for(let i = 1; i <= value; i++) {
//         options2.push( <option key = {i} id= {i} value={i}>{i}</option>)
//     }
//     this.setState({options2: options2})
// }
