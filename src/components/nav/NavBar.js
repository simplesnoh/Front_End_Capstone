import React, { Component } from "react"
import { Link } from "react-router-dom"
import 'semantic-ui-css/semantic.min.css'
import {
    Container,
    Dropdown,
    Menu
  } from 'semantic-ui-react'


class NavBar extends Component {

handleLogout = (event)=>{
   localStorage.clear()
}
    render() {
        return (

        <Menu inverted>
            <Container>
                <Menu.Item as={Link} to="/" header>Dashboard
                {/* <Image size='mini' style={{ marginRight: '1.5em' }} />Dashboard */}
                </Menu.Item>
                <Menu.Item header position='right' />
                <Dropdown item simple text='' >
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} onClick={this.handleLogout} to="/login">Logout</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
            </Container>
        </Menu>
        )
    }
}

export default NavBar
