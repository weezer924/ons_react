import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

class Auth extends Component {
  render() {
    return ((this.props.state && this.props.state.email) ? <Route children={this.props.children} /> : <Redirect to={'/'}/>)
  }
}

function mapStateToProps(state) {
  return {state}
}

export default withRouter(connect(mapStateToProps)(Auth))