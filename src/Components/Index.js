import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import { Container, Button, Input} from 'reactstrap';

class Index extends Component {

  constructor(props) {
    super(props);
    this.state = { slug: "", sharegroup: null };
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ slug: event.target.value });
  }

  handleCreate(event) {
    event.preventDefault();
    fetch('http://localhost:8888/php/expenshare/public/sharegroup/', {
      method: 'POST',
      body: JSON.stringify({ slug: this.state.slug })
    })
      .then(response => response.json())
      .then(data => {

        alert('Nouveau groupe créé avec succès !');
      })
      .catch(err => {
        alert('Erreur lors de la création du groupe')
    })
    ;
  }

  handleOpen(event) {
    event.preventDefault();
    fetch('http://localhost:8888/php/expenshare/public/sharegroup/' + this.state.slug)
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

    if (this.state.sharegroup) {
      debugger
      return <Redirect to={'/group/' + this.state.sharegroup.slug}/>
    }

    return (
      <Container className="App">
        <Input type="text" onChange={e => this.handleChange(e)} placeholder="Groupe ID"/>
        <Button color="primary" onClick={e => this.handleCreate(e)}>Creér</Button>
        <Button color="info" onClick={e => this.handleOpen(e)}>Ouvrir</Button>
      </Container>
    );
  }
}

export default Index;

