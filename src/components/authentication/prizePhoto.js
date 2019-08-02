import React, { Component } from "react"
import { Button, Form } from 'semantic-ui-react'

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

    state = {
       
      }


    render() {
        return (
           <Form>
               <Form.Field
                control="input"
                type="file"
                label="Photo"
                onChange={(e) => this.setState({ aboutMe: e.target.files[0] })}/>
                <Button type="submit" content="Save" color="purple" />
           </Form>

        )
    }
}