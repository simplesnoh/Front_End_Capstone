import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Dashboard from "./dashboard/Dashboard";
import APIManager from "./modules/APIManager";
import Login from "./authentication/Login"
import Register from "./authentication/register"
import { logout } from '../components/authorization/userManager';
import TeamForm from '../components/authentication/TeamForm'
import PrizePhoto from './authentication/PrizePhoto'
import TeamPrizePhoto from './authentication/TeamPrizePhoto'


export default class ApplicationViews extends Component {
  isAuthenticated = () => localStorage.getItem("user") !== null

  state = {
    users: [],
    tasks: [],
    teams: [],
    wheel: [],
    taskType: [],
    userPrize: [],
    userPoints: [],
    teamRelationship: [],
    newWheel: []
  };

  randomizeTasks = () => {
    let thisWheel = this.state.wheel.find(wheel => wheel.teamId === +sessionStorage.getItem('teamId') && wheel.completed !== true)
    let thisTeam = this.state.teams.find(team => team.id === +sessionStorage.getItem('teamId'))
    let thisTask = this.state.tasks.filter(task => task.teamId === +sessionStorage.getItem('teamId'))
    let taskList = thisTask.filter(task => task.taskTypeId === 2)
    let userPoints = this.state.userPoints.filter(points => points.teamId === +sessionStorage.getItem('teamId'))
    let userList = []
    userPoints.forEach(userPoints => {
      this.state.users.filter(user => user.id === userPoints.userId)
      .map(user => {
        userList.push(user)
      })
    })
    let numGroups = userList.length
    let tasksPerGroup = taskList.length / numGroups
    userList.forEach(user => {
    for(let i = 0; i < tasksPerGroup; i++){
      let randomTask = Math.floor(Math.random()*taskList.length)
      if(taskList[randomTask]){
        console.log(user.id)
          const addUserId = {
            name: taskList[randomTask].name,
            completed: taskList[randomTask].completed,
            userId: user.id,
            ownerId: taskList[randomTask].ownerId,
            taskTypeId: taskList[randomTask].taskTypeId,
            teamId: taskList[randomTask].teamId,
            wheelId: taskList[randomTask].wheelId,
            id: taskList[randomTask].id
          }
          taskList.splice(randomTask, 1)
          this.updateAPI(addUserId, 'tasks')
      }
      }
    })
  }


  componentDidMount() {
    const newState = {};

    APIManager.all("users").then(users => (newState.users = users));
    APIManager.all("tasks").then(tasks => (newState.tasks = tasks));
    APIManager.all("teams").then(teams => (newState.teams = teams));
    APIManager.all("wheel").then(wheel => (newState.wheel = wheel));
    APIManager.all("taskType").then(taskType => (newState.taskType = taskType));
    APIManager.all("userPrize").then(userPrize => (newState.userPrize = userPrize));
    APIManager.all("userPoints").then(userPoints => (newState.userPoints = userPoints));
    APIManager.all("teamRelationship").then(teamRelationship => (newState.teamRelationship = teamRelationship))
    // APIManager.getNewWheel('wheel', +sessionStorage.getItem('teamId')).then(newWheel => (newState.newWheel = newWheel))
    .then(() => this.setState(newState))
    }

    deleteFromAPI = (item, resource) =>
    APIManager.delete(item, resource)
   .then(APIManager.all(resource))
   .then(item => {
    //  this.props.history.push("/");
     this.setState({ [resource]: item });
   }); 

    addToAPI = (item, resource) =>
    APIManager.post(item, resource)
   .then(() => APIManager.all(resource))
   .then(item =>{
       this.setState({
       [resource]: item
     })
   }
   );

   updateAPI = (item, resource) => {
    return APIManager.put(item, resource)
      .then(() => APIManager.all(resource))
      .then(item => {
        this.setState({
          [resource]: item
        })
      })


    
  };


  
  //FIXME: This onlogin/onRegister thing doesn't really do anything...
  //Also we need to authenticate on all windows
  
  render() {

    return (
      <React.Fragment>
        <Route path="/login" render={props => {
          return <Login {...props} onLogin={(user) => this.setState({ users: user })} teamRelationship={this.state.teamRelationship} />
          }} />
        
        <Route exact path="/" render={props => {
          let thisWheel = this.state.wheel.find(wheel => wheel.teamId === +sessionStorage.getItem('teamId') && wheel.completed !== true)
          let thisTeam = this.state.teams.find(team => team.id === +sessionStorage.getItem('teamId'))
          let thisTask = this.state.tasks.filter(task => task.teamId === +sessionStorage.getItem('teamId'))
          console.log(thisWheel)
          return <Dashboard {...props} task={thisTask} wheel={thisWheel} team={thisTeam} userPoints={this.state.userPoints} updateAPI={this.updateAPI} addToAPI={this.addToAPI} users={this.state.users} userPrize={this.state.userPrize} getNewWheel={(newWheel) => this.setState({ newWheel: newWheel })} />
          }} />
     
        <Route path="/TeamForm" render={props => {
          let teams = this.state.teams.find((team => team.ownerId === sessionStorage.getItem('team')))
          let wheel = this.state.wheel.find((wheel => wheel.ownerId === sessionStorage.getItem('team')))
          return <TeamForm {...props} addToAPI={this.addToAPI} tasks={this.state.tasks} teams={teams} wheel={wheel} deleteFromAPI={this.deleteFromAPI} updateAPI={this.updateAPI}/>
        }} />

        <Route path="/register" render={props => {
          let items = this.state.teams.map(team => {return { label: `${team.name}` } })
          return <Register {...props} teams={this.state.teams} items={items} addToAPI={this.addToAPI} onRegister={(user) => this.setState({ user: user })} />
          }} />

        <Route path="/PrizePhoto" render={props => {
          let teams2 = this.state.teams.find(team => team.ownerId === sessionStorage.getItem('team'))
          let wheel2 = this.state.wheel.find(wheel => wheel.ownerId === sessionStorage.getItem('team'))
          return <PrizePhoto {...props} teams={teams2} wheel={wheel2} addToAPI={this.addToAPI} updateAPI={this.updateAPI} />
          }} />

        <Route path="/TeamPrizePhoto" render={props => {
          let teams3 = this.state.teams.find((team => team.id === +sessionStorage.getItem('teamId')))
          let wheel3 = this.state.wheel.find((wheel => wheel.teamId === +sessionStorage.getItem('teamId')))
          return <TeamPrizePhoto {...props} teams={teams3} wheel={wheel3} addToAPI={this.addToAPI} updateAPI={this.updateAPI} />
          }} />


      </React.Fragment>
    );
  }
}

