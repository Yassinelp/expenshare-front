import React, { Component } from 'react';
import {NavLink, Route} from 'react-router-dom';
import {Table} from 'reactstrap';
import Form from './Form';

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
                    <th scope="row">{expense.id}</th>
                    <td>{expense.person.firstname + ' ' + expense.person.lastname}</td>
                    <td>{parseFloat(expense.amount) + ' €'}</td>
                    <td>{expense.title}</td>
                    <td>{expense.category.label}</td>
                </tr>
            </tbody>
            );
        }

        return (
            <div>
                <h2>Dépenses</h2>
                <NavLink to={this.props.match.url + '/add'}>Ajouter une dépense</NavLink>
                <Route path={this.props.match.url + '/add'} component={Form}/>
                <Table hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Nom</th>
                        <th>Montant</th>
                        <th>Libelle</th>
                        <th>Catéorie</th>
                    </tr>
                    </thead>
                    {expense}
                </Table>
            </div>
        );
    }
}

export default Expenses;