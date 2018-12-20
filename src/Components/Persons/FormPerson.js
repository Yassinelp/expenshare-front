import React, { Component } from 'react';
import {Form, FormGroup, Input, InputGroup, Button} from 'reactstrap';

class FormPerson extends Component {
    
    constructor(props) {
        super(props);
        this.state = { firstname: "", lastname: "", person: null};
    }

    handleChangeF(event) {
        event.preventDefault();
        this.setState({ firstname: event.target.value});
    }

    handleChangeL(event) {
        event.preventDefault();
        this.setState({ lastname: event.target.value });
    }

    handleCreate(event) {
        event.preventDefault();
        fetch('http://localhost:8888/php/expenshare/public/person/', {
            method: 'POST',
            body: JSON.stringify({ firstname: this.state.firstname, lastname: this.state.lastname, slug: this.props.slug })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert('Nouvelle personne crée avec succès !');
            })
            .catch(err => alert('Erreur lors de la création de la personne'))
        ;
    }
    render() {
        return (
            <div>
                    <h3 >Ajouter une personne au groupe {this.state.slug}</h3>
                    <Form>
                        <FormGroup>
                            <InputGroup>
                                <Input type="text" value={this.state.firstname} onChange={e => this.handleChangeF(e)} placeholder="Prénom" />
                            </InputGroup>
                            <InputGroup>
                                <Input type="text" value={this.state.lastname} onChange={e => this.handleChangeL(e)} placeholder="Nom" />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <Button onClick={e => this.handleCreate(e)} >Ajouter</Button>
                        </FormGroup>
                    </Form>
            </div>
        );
    }
}

export default FormPerson;