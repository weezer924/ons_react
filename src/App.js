import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navbar, Button } from 'react-bootstrap'
import './App.css'

import Kanban from './bbs/kanban'
import InputPost from './bbs/inputPost'
import firebase from 'firebase/app'
import 'firebase/auth'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: this.getNowYMD(),
      docName: this.getDocName(),
      collectionName: this.getCollectionName()
    }
    this.logout = this.logout.bind(this)
  }

  getNowYMD() {
    const dt = new Date();
    const y = dt.getFullYear();
    const m = ("00" + (dt.getMonth()+1)).slice(-2);
    const d = ("00" + dt.getDate()).slice(-2);
    const result = y + '年' + m + '月' + d + '日';
    return result;
  }

  getDocName() {
    const dt = new Date();
    const y = dt.getFullYear();
    const m = ("00" + (dt.getMonth()+1)).slice(-2);
    return  y + m;
  }

  getCollectionName() {
    const dt = new Date();
    const d = ("00" + dt.getDate()).slice(-2);
    return d;
  }

  logout() {
    firebase.auth().signOut()
    this.props.dispatch({
      type: 'UPDATE_USER',
      value: {
        login: false,
        username: '',
        email: ''
      }
    })
    this.handleToLogOutPage()
  }

  handleToLogOutPage = () => {
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>
            <div style={{color: "white"}}>{this.state.date}, {this.props.state.username}</div>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Button variant="info" onClick={this.logout}>ログアウト</Button>
            {/* <ButtonGroup aria-label="Basic example"> */}
              {/* <Button variant="info">今日</Button> */}
              {/* <Button variant="info">今週</Button> */}
              {/* <Button variant="info">今月</Button> */}
            {/* </ButtonGroup> */}
          </Navbar.Collapse>
        </Navbar>
        <Kanban docName={this.state.docName} collectionName={this.state.collectionName} />
        <br /><br /><br />
        <InputPost docName={this.state.docName} collectionName={this.state.collectionName} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {state};
}

export default connect(mapStateToProps)(App)
