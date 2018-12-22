import React, { Component } from 'react';
import {Form, FormGroup, Input, InputGroup, Button} from 'reactstrap';


class FormExpense extends Component {

    constructor(props) {
        super(props);
        this.state = { firstname: '', lastname:'',  category : [], person : [], cat : "", pers: "" };
    }

    handleChangeT(event) {
        event.preventDefault();
        this.setState({ title: event.target.value});
    }

    handleChangeA(event) {
        event.preventDefault();
        this.setState({ amount: event.target.value});
    }

    handleChangeC(event) {
        event.preventDefault();
        this.setState({ cat: event.target.value});
    }

    handleChangeD(event) {
        event.preventDefault();
        this.setState({ createdAt: event.target.value});
    }

    handleChangeP(event) {
        event.preventDefault();
        this.setState({ pers: event.target.value});
    }

    handleCreate(event) {
        event.preventDefault();
        fetch('http://localhost:8888/php/expenshare/public/expense/', {
            method: 'POST',
            body: JSON.stringify({ title: this.state.title, amount: this.state.amount, createAt: this.state.createdAt, category: this.state.cat , person : this.state.pers, slug : this.props.slug })
        })
            .then(response => response.json())
            .then(data => {
                alert('Nouvelle dépense crée avec succès !');
            })
            .catch(err => alert('Erreur lors de la création de la dépense'))
        ;
    }

    componentDidMount() {
        fetch('http://localhost:8888/php/expenshare/public/person/group/' + this.props.slug, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => this.setState({ person: data }));

        fetch('http://localhost:8888/php/expenshare/public/category/', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => this.setState({ category: data }));
    }

    render() {

        const person = this.state.person.map(p => <option key={p.id} value={p.id}>{p.firstname + ' ' + p.lastname}</option>);
        const category = this.state.category.map(c => <option key={c.id} value={c.id}>{c.label}</option>);

        return (
            <div>
            
            <Form className="m-0 m-auto"> 
                <FormGroup>
                <h3 className="text-center">Ajouter une Dépense au groupe : {this.props .slug}</h3>
                    <InputGroup>
                        <Input className="form-control form-control-lg col-md-6 m-0 m-auto" type="text" value={this.state.title} onChange={e => this.handleChangeT(e)} placeholder="Libelle" />
                    </InputGroup>
                    <InputGroup>
                        <Input className="form-control form-control-lg col-md-6 m-0 m-auto" type="number" value={this.state.amount} onChange={e => this.handleChangeA(e)} placeholder="Montant" />
                    </InputGroup>
                    <InputGroup>
                        <Input className="form-control form-control-lg col-md-6 m-0 m-auto" type="date" value={this.state.createdAt} onChange={e => this.handleChangeD(e)} placeholder='jj mm aaaa'/>
                    </InputGroup>
                    <InputGroup>
                        <Input className="form-control form-control-lg col-md-6 m-0 m-auto" type="select" onChange={e => this.handleChangeC(e)} >
                        <option value="">Catégories :</option>
                        {category}
                        </Input>
                    </InputGroup>
                    <InputGroup>
                        <Input className="form-control form-control-lg col-md-6 m-0 m-auto" type="select" onChange={e => this.handleChangeP(e)} >
                        <option value="">Dépense faite par :</option>
                        {person}
                        </Input>
                    </InputGroup>
                    <FormGroup>
                    <Button onClick={e => this.handleCreate(e)} className="m-2 px-4 btn-lg btn-info" >Ajouter</Button>
                </FormGroup>
                </FormGroup>
                
            </Form>
    </div>
        );
    }
}

export default FormExpense;