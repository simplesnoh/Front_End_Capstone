import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Dashboard from "./dashboard/Dashboard";
import APIManager from "./modules/APIManager";
import Login from "./authentication/Login"
import Register from "./authentication/register"
import { logout } from '../components/authorization/userManager';


export default class ApplicationViews extends Component {
  isAuthenticated = () => localStorage.getItem("user") !== null

  state = {
    users: [],
    tasks: [],
    teams: [],
    wheel: [],
    points: [],
    taskType: [],
    userPrize: [],
    UserPoints: [],
    teamRelationship: []
  };


  componentDidMount() {
    const newState = {};

    APIManager.all("users").then(users => (newState.users = users));
    APIManager.all("tasks").then(tasks => (newState.tasks = tasks));
    APIManager.all("teams").then(teams => (newState.teams = teams));
    APIManager.all("wheel").then(wheel => (newState.wheel = wheel));
    APIManager.all("points").then(points => (newState.points = points));
    APIManager.all("taskType").then(taskType => (newState.taskType = taskType));
    APIManager.all("userPrize").then(userPrize => (newState.userPrize = userPrize));
    APIManager.all("userPoints").then(userPoints => (newState.userPoints = userPoints));
    APIManager.all("teamRelationship").then(teamRelationship => (newState.teamRelationship = teamRelationship))
    .then(() => this.setState(newState));
    }

    addToAPI = (item, resource) =>
    APIManager.post(item, resource)
   .then(() => APIManager.all(resource))
   .then(item =>{
       this.setState({
       [resource]: item
     })
   }
   );

//FIXME: This onlogin/onRegister thing doesn't really do anything...

  render() {
      console.log(this.state.teams)
    return (
      <React.Fragment>
        <Route path="/login" render={props => {
          return <Login {...props} onLogin={(user) => this.setState({ user: user })} /*users={this.state.users} addUser={this.addToAPI}*/ />
          }} />
        <Route exact path="/" render={(props) => {
            return this.state.user ? (
              <Dashboard {...props} user={this.state.user} onLogout={logout} />
            ) : (
                <Redirect to="/login" />
              )
          }} />

        <Route path="/register" render={props => {
          return <Register {...props} teams={this.state.teams} addUser={this.addToAPI} onRegister={(user) => this.setState({ user: user })}/*users={this.state.users} addUser={this.addToAPI}*/ />
          }} />

      </React.Fragment>
    );
  }
}

