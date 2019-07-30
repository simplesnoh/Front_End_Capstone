import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Dashboard from "./dashboard/Dashboard";
import APIManager from "./modules/APIManager";
import Login from "./authentication/Login"


export default class ApplicationViews extends Component {
  isAuthenticated = () => sessionStorage.getItem("id") !== null



  render() {
    return (
      <React.Fragment>
        <Route path="/login" render={props => {
          return <Login {...props} /*users={this.state.users} addUser={this.addToAPI}*/ />
          }} />
        <Route
          exact path="/" render={props =>{
            if(this.isAuthenticated()){
                // let events = this.state.events.filter((event => event.userId === parseInt(sessionStorage.getItem("id"))))
                return <Dashboard {...props}/>
         }else {
            return <Redirect to="./login" />
          }}}
        />
      </React.Fragment>
    );
  }
}

