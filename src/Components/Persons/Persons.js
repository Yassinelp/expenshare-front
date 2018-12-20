import React, { Component } from 'react';
import {Table} from 'reactstrap';
import {NavLink, Route} from "react-router-dom";
import FormPerson from './FormPerson';

class Persons extends Component {

    constructor(props) {
        super(props)
        this.state = { persons: [] };
    }

    componentDidMount() {
        fetch('http://localhost:8888/php/expenshare/public/person/group/' + this.props.slug)
            .then(response => response.json())
            .then(data => this.setState({ persons : data}))
            ;
    }
    render() {

        const persons = this.state.persons.map(person => {
            let total = person.expenses.reduce((accumulator, expense) => accumulator + parseFloat(expense.amount), 0)
            return (
                <li>
                    {person.firstname} a fait : <br/>
                    {person.expenses.length} dépense(s) <br/>
                    Total : {total} €
                    <hr/>
                </li>
            );  
        });

        return (
            <React.Fragment>
                <h1>Personnes</h1>
                <NavLink to={this.props.match.url + '/add'}>Ajouter une personne</NavLink>
                <Route path={this.props.match.url + '/add'} render={props => <FormPerson {...props} slug={this.props.slug}/>}/>

                <Table hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Nom</th>
                        <th>Montant</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    {persons}
                </Table>
            </React.Fragment>

        );
    }
}

export default Persons;