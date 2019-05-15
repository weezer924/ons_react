import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Button, Card } from 'react-bootstrap'
import firebase from 'firebase/app'
import 'firebase/auth'

class Login extends Component {
  container = {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroudColor: ''
  }

  constructor(props) {
    super(props)
    this.login = this.login.bind(this)
  }

  login() {
    const self = this
    const user = firebase.auth().currentUser
    if (user) {
      this.updateUser(self, user)
      return
    }

    let provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/admin.directory.user.readonly')
    provider.setCustomParameters({
      hd: 'shift-plus.jp'
    });
    firebase.auth().signInWithPopup(provider).then(res => {
      this.updateUser(self, res.user)
    })
  }

  handleToAppPage = () => {
    this.props.history.push('/App')
  }

  updateUser(self, user) {
    self.props.dispatch({
      type: 'UPDATE_USER',
      value: {
        login: true,
        username: user.displayName,
        email: user.email
      }
    })
    self.handleToAppPage()
  }

  render() {
    return (
      <div style={this.container}>
        <Card style={{ width: '20rem', border: '1px solid #555', boxShadow: '0px 1px 10px #488a9e' }}>
          <Card.Img variant="top" />
          <Card.Body>
            <Card.Title style={{ fontSize: 42 }}>Tsubu <span role="img" aria-label="mouse">🐭</span></Card.Title>
            <br />
            <Card.Text>
              ”いま”をShareしよう
            </Card.Text>
            <br />
            <Button variant="outline-primary" onClick={this.login}>ログイン</Button>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {state}
}

export default withRouter(connect(mapStateToProps)(Login))
