import React, { Component } from "react"
import { Button, Form, Grid, Header, Message, Segment, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { register } from '../authorization/userManager';
import Autocomplete from 'react-autocomplete'
import './register.css'
import APIManager from '../modules/APIManager'

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
        show: false,
        afterMakeTeam: true,
        email: '',
        username: '',
        password: '',
        teamId: '',
        value: ''
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

        submitWithTeam = (event) => {
            event.preventDefault();
            APIManager.getTeam(this.state.value, "teams")
            .then(team => sessionStorage.setItem("teamId", team[0].id))
            .then(() => {
                const user = {
                    email: this.state.email,
                    username: this.state.username,
                    password: this.state.password
                    }
                let finalUser = register(user)
                this.props.onRegister(finalUser)
                return finalUser
            })
            .then((user) => {
                const teamRelationship = {
                    userId: user.id,
                    teamId: +sessionStorage.getItem('teamId')
                    }
                sessionStorage.setItem('team', user.id)
                return teamRelationship
            })
            .then(teamRelationship => this.props.addToAPI(teamRelationship, "teamRelationship"))
            .then(this.props.history.push('/TeamPrizePhoto'))
        }
            

          getInfo = () => {
            return fetch(`${url}/teams?name=${this.state.query}`).then(e => e.json())
              .then(({ data }) => {
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

         handleSearchShow = (event) => {
            event.preventDefault();
             this.setState({show: true})
             this.setState({afterMakeTeam: false})
         }

        
        render() {

            console.log(this.state.value)
    
        return (

        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
                {/* <Image src='/logo.png' />*/} Register User
            </Header>
            <Form size='large' >
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
                <div className= {this.state.show ? 'hide': ""}>
                <Button color='teal' fluid size='large' onClick={this.handleSearchShow}>
                    Join Team
                </Button>
                </div>

                <br/>

                <div className= {this.state.afterMakeTeam ? 'hide': ""}>
                <Label>Search For your team</Label>

                <br/>
                <br/>
                <Autocomplete
                getItemValue={(item) => item.label}
                items={this.props.items}
                renderItem={(item, isHighlighted) =>
                    <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                    {item.label}
                    </div>
                }
                value={this.state.value}
                onChange={(e) => this.setState({value : e.target.value})}
                onSelect={(val) => this.setState({value : val})}
                />

                <br/>
                <br/>
                 
                <Button color='teal' fluid size='large' onClick={this.submitWithTeam}>
                    submit
                </Button>
                </div>

                <div className= {this.state.show ? 'hide': ""}>
                <Button type='submit' color='teal' fluid size='large'onClick={this.submit} >
                    Make Team
                </Button>
                </div>

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