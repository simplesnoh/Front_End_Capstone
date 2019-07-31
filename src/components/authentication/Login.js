import React, { Component } from "react"
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import "./Login.css"
import { Link } from 'react-router-dom';
import { loginUser } from '../authorization/userManager';

//TODO: Make the navbar go awao
// get rid of weird space
// add logo

export default class Login extends Component {

    state = {
        email: '',
        password: ''
      }
    
      submit = () => {
        loginUser(this.state.email, this.state.password)
          .then((user) => {
            this.props.onLogin(user);
            this.props.history.push('/');
          });
      }

    

    render() {
        return (

  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        {/* <Image src='/logo.png' />*/} Member Login 
      </Header>
      <Form size='large' onSubmit={this.submit}>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' onChange={(e) => this.setState({email: e.target.value})} />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            onChange={(e) => this.setState({password: e.target.value})}
          />

          <Button color='teal' fluid size='large'>
            Login
          </Button>
        </Segment>
      </Form>
      <Message>
        New around here? <Link to="/register">Sign Up</Link>
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

