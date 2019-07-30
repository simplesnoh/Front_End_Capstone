import React, { Component } from "react"
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { register } from '../authorization/userManager';
import SearchBar from 'react-search-bar-semantic-ui';

//FIXME: These buttons stack instead of are next to each other
//FIXME: Have it throw the firebase errors on the screen
export default class Register extends Component {

    state = {
        email: '',
        username: '',
        password: '',
        team: ''
    }
      
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

        
        render() {

            // const data = 
            // this.props.teams.map((team)=> ({title: `${team.name}`}))
            // console.log(data)

            // const data1 = 
            // [
            //     {
            //         title: "Hello you",
            //         // ... whatever other fields
            //     },
            //     {
            //         title:"awesome"
            //     }
            // ]
            // console.log(data1)

        return (

        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
                {/* <Image src='/logo.png' />*/} Register User
            </Header>
            <Form size='large' onSubmit={this.submit}>
                <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left' placeholder="Username" onChange={(e) => this.setState({ username: e.target.value })}/>
                <Form.Input fluid icon='envelope' iconPosition='left' placeholder='E-mail address' onChange={(e) => this.setState({ email: e.target.value })}/>
                <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    onChange={(e) => this.setState({ password: e.target.value })}
                />
                <Button color='teal' fluid size='large'>
                    Join Team
                </Button>

                <br/>

                <SearchBar />

                 <br/>
                <Button type='submit' color='teal' fluid size='large' >
                    submit
                </Button>

                <br/>
                <Button type='submit' color='teal' fluid size='large' >
                    Make Team
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