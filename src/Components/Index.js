import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import { Container, Button, Input, Card, CardTitle, CardText, Row, Col} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
              <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>.
            <Card body inverse color="info">
        <CardTitle>Saisissez l'identifiant du groupe :</CardTitle>
        <CardText></CardText>
        <Input type="text" onChange={e => this.handleChange(e)} placeholder="Groupe ID"/>
        <br/>
        <Button color="primary" onClick={e => this.handleCreate(e)}>Creér</Button>
        <br/>
        <Button color="primary" onClick={e => this.handleOpen(e)}>Ouvrir</Button>
          </Card>
          </Col>
          </Row>
      </Container>
    );
  }
}

export default Index;

