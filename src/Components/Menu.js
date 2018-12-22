import React, { Component } from 'react';
import {NavLink } from 'react-router-dom';
import {Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, Collapse, Container, Button} from 'reactstrap';

class Menu extends Component {

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
        
    toggle() {
        this.setState({
        isOpen: !this.state.isOpen
        });
    }
    
    render() {
        return (
            <Container>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/"><h2>€xpen$hare</h2></NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Button outline color="info"><NavLink to={this.props.url}>Dashboard</NavLink></Button> 
                            </NavItem>
                            {''}
                            <NavItem>
                                <Button outline color="info"><NavLink to={this.props.url + '/expenses'}>Dépenses</NavLink></Button>
                            </NavItem>
                            {''}
                            <NavItem>
                                <Button outline color="info"><NavLink to={this.props.url + '/persons'}>Personnes</NavLink></Button>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </Container>
        );
    }
}



export default Menu;