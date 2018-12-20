import React, { Component } from 'react';
import {Table} from 'reactstrap';
import {NavLink, Route} from "react-router-dom";
import FormPerson from './FormPerson';
import {Container} from 'reactstrap';

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
                <tr>
                    <td>{person.firstname} {person.lastname} a fait : </td>
                    <td>{person.expenses.length} dépense(s) </td>
                    <td>{total} €</td>
                    <hr/>
                </tr>
            );  
        });

        return (
            <React.Fragment>
                <Container>
                <h1>Personnes</h1>
                
                <Table hover>
                    <thead>
                    <tr>
                        <th>Participant</th>
                        <th>Nombre de dépense(s)</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                        {persons}
                    </tbody>
                    
                </Table>

                <NavLink to={this.props.match.url + '/add'}>Ajouter une personne</NavLink>
                <Route path={this.props.match.url + '/add'} render={props => <FormPerson {...props} slug={this.props.slug}/>}/>
                </Container>
            </React.Fragment>

        );
    }
}

export default Persons;