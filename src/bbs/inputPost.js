import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Navbar, InputGroup, FormControl } from 'react-bootstrap'
import firebase from 'firebase/app'
import 'firebase/firestore'

class InputPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      docName: this.props.docName,
      collectionName: this.props.collectionName
    }
    this.doChange = this.doChange.bind(this);
    this.doSubmit = this.doSubmit.bind(this);
  }

  doChange(event) {
    if(event.target.value.length > 50) {
      event.target.value = event.target.value.substr(0, 70);
    }
    this.setState({value: event.target.value})
  }

  doSubmit(event) {
    this.postTwitt()
    event.preventDefault()
  }

  postTwitt() {
    if (!this.props.state.email) {
      return
    }

    const db = firebase.firestore()
    db.collection('posts').doc(this.state.docName).collection(this.state.collectionName).add({
      text: this.state.value,
      like: 0,
      dislike: 0,
      date: firebase.firestore.Timestamp.fromDate(new Date()),
      owner: this.props.state.email,
      likers: []
    }).catch(error => console.log(error))
    this.setState({value: ''});
  }

  render() {
    return (
      <Navbar bg="dark" fixed="bottom">
        <form style={{ width: "100%" }} onSubmit={this.doSubmit}>
          <InputGroup className="mb-3">
            <FormControl placeholder="いまなにしちゅう？🐭" onChange={this.doChange} value={this.state.value} required />
            <InputGroup.Append>
              <Button variant="primary" type="submit">つぶちゅう</Button>
            </InputGroup.Append>
          </InputGroup>
        </form>
      </Navbar>
    )
  }
}

function mapStateToProps(state) {
  return {state};
}

export default connect(mapStateToProps)(InputPost)
