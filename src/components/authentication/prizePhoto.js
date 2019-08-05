import React, { Component } from "react";
import { Button, Form, Grid, Header, Segment, Image } from "semantic-ui-react";
import APIManager from "../modules/APIManager";
import * as firebase from "firebase/app";
import "firebase/storage";

/*TODO:
-create form container
-Add pick your prize input
-link it to prize state
 "prize": 
 "userId":
"monthRoundId": 
-Create photo input
-link it to firebase storage
-submit button
- link it to submit
- send us to dashboard
*/

export default class PrizePhoto extends Component {
  storageRef = firebase.storage().ref("profile_images");

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      otehrFile: null,
      email: "",
      username: "",
      prize: "",
      round: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }


  submitForm = () => {
    this.storageRef
      .put(this.state.otherFile)
      .then((data) => data.ref.getDownloadURL())
      .then((url) => {
        const updatedUser = {
          email: this.state.email,
          username: this.state.username,
          photoUrl: url,
          id: sessionStorage.getItem("team")
        };
        return updatedUser
      })
      .then((updatedUser) => this.props.updateAPI(updatedUser, "users"))
        .then(() => {
            const updatedWheel = {
            id: this.props.wheel.id,
            completed: this.props.wheel.completed,
            ownerId: sessionStorage.getItem('team'),
            teamId: this.props.teams.id
        }
        return updatedWheel
        })
        .then((updatedWheel) => this.props.updateAPI(updatedWheel, "wheel"))
        .then(() => {
            const userPrize = {
                prize: this.state.prize,
                userId: sessionStorage.getItem('team'),
                wheelId: this.props.wheel.id
            }
            return userPrize
        })
        .then((userPrize) => this.props.addToAPI(userPrize, "userPrize"))
        .then(() => {
            const userPoints = {
                teamId: this.props.teams.id,
                wheelId: this.props.wheel.id,
                userId: sessionStorage.getItem('team'),
                points: 0
            }
            return userPoints
        })
        .then((userPoints) => this.props.addToAPI(userPoints, "userPoints"))
        .then(this.props.history.push('/'))
  };

  handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
      otherFile: event.target.files[0]
    });
  }

  componentDidMount() {
    APIManager.get("users", sessionStorage.getItem("team"))
    .then(user => {
      this.setState({
        email: user.email,
        username: user.username
      });
    });
  }

  render() {

    console.log(this.props.teams)

    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            {/* <Image src='/logo.png' />*/} Last Step!
          </Header>

          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                label="Pick Your Personal Prize"
                onChange={e => this.setState({ prize: e.target.value })}
              />
            </Segment>
            <Segment stacked>
              <Image src={this.state.file} size="small" circular centered />
              <Form.Field
                control="input"
                type="file"
                label="Choose A Photo"
                onChange={this.handleChange}
              />
              <Button
                type="submit"
                content="Submit"
                color="purple"
                onClick={this.submitForm}
              />
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}
