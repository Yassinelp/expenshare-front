import React, { Component } from 'react';
import Menu from './Menu';
import {Route} from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import Expenses from './Expenses/Expenses';
import Persons from './Persons/Persons';

class Group extends Component {

    constructor(props) {
        super(props);
        this.state = { sharegroup: null };
    }

    componentDidMount() {
        fetch('http://localhost:8888/php/expenshare/public/sharegroup/' + this.props.match.params.slug)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ sharegroup: data });
            })
            .catch(err => {
                alert('Ce groupe n\'existe pas !');
            });
        ;
    }

    render() {

        if (!this.state.sharegroup) {
            return <div>Chargement en cours...</div>
        }

        return (
            <div>
                <h1>{this.state.sharegroup.slug}</h1>
                <Menu url={this.props.match.url}/>
                <Route path={this.props.match.url} exact component={Dashboard} />
                <Route path={this.props.match.url + '/expenses'} render={props => <Expenses {...props} slug={this.props.match.params.slug} />}/>
                <Route path={this.props.match.url + '/persons'} render={props => <Persons {...props} slug={this.props.match.params.slug} />}/>
            </div>
        );
    }
}

export default Group;