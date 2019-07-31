import React, { Component } from "react"
import "./Login.css"
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

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

/*TODO: TASK DIVS
- do a loop over number of members and create a div for each of them
- Each div needs
group number attached as key
-inside of each div you need to send in 
*/

const options = [
    { key: '0m', text: '0', value: 0 },
    { key: '3m', text: '3', value: 3 },
    { key: '4m', text: '4', value: 4 },
    { key: '5m', text: '5', value: 5 },
    { key: '6m', text: '6', value: 6 }
]



export default class TeamForm extends Component {

    state = {
       memberValue: "",
       teamName: "",
       options,
       value: options[0].value,
       groupNumber: ""
      }

 
    
    createOptions = () => {
        // let hello = <options key="560">Hello</options>
        // this.setState({hello: hello})
        console.log("first", this.state.value)
        let num = this.state.value
        let options2 = []
        for(let i = 1; i <= num; i++) {
            options2.push( <option key = {i} id= {i} value={i}>{i}</option>)
        }
        this.setState({options2: options2})
        console.log("is this happening?", options2)
        console.log(this.state.value)
    }


    render() {
    
        const { value, options } = this.state;

        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='teal' textAlign='center'>
                {/* <Image src='/logo.png' />*/} Make your team!
              </Header>
              <Form size='large'>
                {/* <Segment stacked> */}
                  <Form.Input fluid label='Team Name' onChange={(e) => this.setState({teamName: e.target.value})} />
                  <Form.Select fluid label='How Many Members?' options={options} value={value} placeholder='Pick A Number' onChange={(e, {value}) => {
                      this.setState({value})
                      this.createOptions()}}/>
                  <Form.Input fluid label='Task' onChange={(e) => this.setState({email: e.target.value})} />
                  {/* <Form.Select fluid label='Group' value={value2} options={this.createOptions} placeholder='Pick A Group' /> */}
                    
                  <label htmlFor="employee">Group:</label>
                    <select defaultValue="" name="group" id="groupId"onChange={(e) => this.setState({groupNumber: e.target.value})}>
                        <option value="">Select a Group</option>
                        {this.state.options2}
                    </select>
                    <br/>
                    <Button color='teal' fluid size='large'>
                    Add
                  </Button>




                    <Form.Input fluid label='Pick A Punishment' onChange={(e) => this.setState({teamName: e.target.value})} />
                    
                  <Button color='teal' fluid size='large'>
                    Start Your Team
                  </Button>
                {/* </Segment> */}
              </Form>
            </Grid.Column>
          </Grid>
        )
    }
}

{/* <select
              defaultValue=""
              name="employee"
              id="employeeId"
              onChange={this.handleFieldChange}
            >
              <option value="">Select an employee</option>
              {this.props.employees.map(e => (
                <option key={e.id} id={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select> */}