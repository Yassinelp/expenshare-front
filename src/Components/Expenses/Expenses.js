import React, { Component } from 'react';
import {NavLink, Route} from 'react-router-dom';
import {Container, Table} from 'reactstrap';
import Form from './Form';
import Moment from 'react-moment';

class Expenses extends Component {

    constructor(props) {
        super(props)
        this.state = { expenses : [] };
    }

    componentDidMount() {
        fetch('http://localhost:8888/php/expenshare/public/expense/group/' + this.props.slug)
            .then(response => response.json())
            .then(data => this.setState({ expenses : data }))
            ;
    }

    render() {

        let expense = <tbody><tr><td>Chargement en cours</td></tr></tbody>;

        if (this.state.expenses.length > 0) {
            expense = this.state.expenses.map(expense =>
            <tbody key={expense.id}>
                <tr>
                    <td>{expense.person.firstname + ' ' + expense.person.lastname}</td>
                    <td>{parseFloat(expense.amount) + ' €'}</td>
                    <td>{expense.title}</td>
                    <td>{expense.category.label}</td>
                    <td><Moment format="DD/MM/YYYY">{expense.createdAt}</Moment></td>
                </tr>
            </tbody>
            );
        }

        return (
            <Container>
            <div>
                <h2>Dépenses</h2>
                <NavLink to={this.props.match.url + '/add'}>Ajouter une dépense</NavLink>
                <Route path={this.props.match.url + '/add'} component={Form}/>
                <Table hover>
                    <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Montant</th>
                        <th>Libelle</th>
                        <th>Catégorie</th>
                        <th>Dépense faite le :</th>
                    </tr>
                    </thead>
                    {expense}
                </Table>
            </div>
            </Container>
        );
    }
}

export default Expenses;