import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

class Menu extends Component {
    render() {
        return (
            <nav>
                <ul>
                    <li><NavLink to={this.props.url}>Dashboard</NavLink></li>
                    <li><NavLink to={this.props.url + '/expenses'}>Dépenses</NavLink></li>
                    <li><NavLink to={this.props.url + '/persons'}>Personnes</NavLink></li>
                </ul>
            </nav>
        );
    }
}

export default Menu;