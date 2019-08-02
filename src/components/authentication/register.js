import React, { Component } from "react"
import { Button, Form, Grid, Header, Message, Segment, Search } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { register } from '../authorization/userManager';

//FIXME: These buttons stack instead of are next to each other
//FIXME: Have it throw the firebase errors on the screen

/*TODO: 
-create search bar and search bar submit
-create hide and show class for team/join buttons
-create teamRelationship & submit user on join team
****How do we grab teamId????
****How do I create two submits that do two things
*/

const url = "http://localhost:5002";
export default class Register extends Component {

    state = {
        email: '',
        username: '',
        password: '',
        teamId: '',
        query: '',
        results: []
    }
      
        submit = () => {
        const user = {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
        }
        register(user)
            .then((user) => {
            const teams = {
                ownerId: user.id
                }
                this.props.addToAPI(teams, "teams")
                .then(sessionStorage.setItem('team', teams.ownerId))
            const wheel = {
                completed: false,
                ownerId: user.id
                }
                this.props.addToAPI(wheel, "wheel")
              this.props.history.push('/TeamForm');
              this.props.onRegister(user);
            });
        }

          getInfo = () => {
            return fetch(`${url}/teams?name=${this.state.query}`).then(e => e.json())
              .then(({ data }) => {
                  console.log("query", data)
                this.setState({
                  results: data
                })
              })
          }
        
          handleInputChange = () => {
            this.setState({
              query: this.search.value
            }, () => {
              if (this.state.query && this.state.query.length > 1) {
                if (this.state.query.length % 2 === 0) {
                  this.getInfo()
                }
          }
        }
            )
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

                <input
                placeholder="Search for..."
                ref={input => this.search = input}
                onChange={this.handleInputChange}
                />
                <p>{this.state.query}</p>
     

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
    }
}