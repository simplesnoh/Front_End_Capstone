import React, { Component } from "react"
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { register } from '../auth/userManager';


export default class Login extends Component {

    state = {
        email: '',
        username: '',
        password: ''
    }

    // handleFieldChange = (event) => {
    //     const stateToChange = {}
    //     stateToChange[event.target.id] = event.target.value
    //     this.setState(stateToChange)
    // }
      
        submit = () => {
          const user = {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
          }
      
          register(user)
            .then((user) => {
              this.props.history.push('/');
              this.props.onRegister(user);
            });
        }

    // handleLogin = (event) => {
    //     event.preventDefault()
    //     if(this.state.user_name === "" || this.state.password === ""){
    //         alert("Please fill in username and password")
    //     }
    //     let userMatch = this.props.users.find(user =>(user.user_name === this.state.user_name && user.password === this.state.password))
    //     if(userMatch !== undefined){
    //         sessionStorage.setItem("id", userMatch.id)
    //         this.props.history.push("/")
    //     }
    //     else{
    //           alert("Password or username does not match. Try again or register!")
    //     }
    //     }


    // handleRegister = (event) => {
    //     event.preventDefault()
    //     let userMatch = this.props.users.filter(user =>
    //         (user.user_name === this.state.user_name || user.email === this.state.email))
    //     if(this.state.user_name === "" || this.state.password === "" || this.state.email === ""){
    //         alert("Please fill in username, email, and password")
    //     }
    //     else if(userMatch.length === 0){
    //         this.props.addUser(this.state, "users")
    //             .then( event => {
    //                 let newUserMatch = this.props.users.filter(user => (user.user_name === this.state.user_name))
    //                 sessionStorage.setItem("id", newUserMatch[0].id)
    //                 this.props.history.push("/")
    //             })
    //     }else{
    //         alert("Username or email is already in use.")
    // }}

    render() {
        return (

  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        {/* <Image src='/logo.png' />*/} Member Login 
      </Header>
      <Form size='large' onSubmit={this.submit}>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' onChange={(e) => this.setState({ username: e.target.value })}/>
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
          />

          <Button color='teal' fluid size='large'>
            Login
          </Button>
        </Segment>
      </Form>
      <Message>
        Already registered? <Link to="/login">Log In</Link>
      </Message>
    </Grid.Column>
  </Grid>
)


        //     <Segment placeholder className="login">
        //         <Grid columns={2} relaxed='very' stackable>
        //         <Grid.Column>
        //             <Form onSubmit={this.handleLogin}>
        //             <Form.Input onChange={this.handleFieldChange} id="user_name" icon='user' iconPosition='left' label='Username' placeholder='Username' />
        //             <Form.Input onChange={this.handleFieldChange} id="password" icon='lock' iconPosition='left' label='Password' type='password' />

        //             <Button content='Login' primary />
        //             </Form>
        //         </Grid.Column>

        //         <Grid.Column verticalAlign='middle'>
        //         <Modal size='tiny' trigger={<Button content='Sign up' icon='signup' size='big' />} >
        //             <Modal.Header>Register</Modal.Header>
        //             <Modal.Content>
        //                 <Form onSubmit={this.handleRegister}>
        //                     <Form.Input onChange={this.handleFieldChange} id="user_name" icon='user' iconPosition='left' label='Username' placeholder='Username' />
        //                     <Form.Input onChange={this.handleFieldChange} id="email" icon='user' iconPosition='left' label='Email' placeholder='Email' />
        //                     <Form.Input onChange={this.handleFieldChange} id="password" icon='lock' iconPosition='left' label='Password' type='password' />
        //                     <Button content='Register' primary />
        //                 </Form>
        //             </Modal.Content>
        // </Modal>
        //         </Grid.Column>
        //         </Grid>

        //         <Divider vertical>Or</Divider>
        //     </Segment>
        
    }
}