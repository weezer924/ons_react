import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Button, Card, Row, Col } from 'react-bootstrap'
import firebase from 'firebase/app'
import 'firebase/firestore'

class Kanban extends Component {
  cardStyle = {
    margin: "3px",
    border: '1px solid #555',
    boxShadow: '0px 1px 10px #488a9e'
  }
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      docName: this.props.docName,
      collectionName: this.props.collectionName
    }
    this.addLikeToPost = this.addLikeToPost.bind(this)
  }

  componentDidMount() {
    this.unsubscribe = this.getPosts()
  }

  getPosts() {
    const db = firebase.firestore()
    const ref = db.collection('posts')
    let self = this
    return ref.doc(this.state.docName).collection(this.state.collectionName).orderBy('date').onSnapshot(res => {
      self.setState({
        posts: res.docs.map(docOne => {
          return { id: docOne.id, data: docOne.data() }
        })
      })
    }, error => {
      console.error(error)
    })
  }

  addLikeToPost(postOne) {
    if (!this.props.state.email) {
      return
    }
    const db = firebase.firestore()
    const ref = db.collection('posts')
    if (postOne.data.owner === this.props.state.email || postOne.data.likers.includes(this.props.state.email)) {
      return
    }

    if (postOne.data.like < 999) {
      const like = postOne.data.like + 1
      const likers = postOne.data.likers;
      likers.push(this.props.state.email)
      ref.doc(this.state.docName).collection(this.state.collectionName).doc(postOne.id).update({
        like: like,
        likers: likers
      }).catch(error => console.log(error))
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  setViewPosts() {
    if (this.state.posts === null || this.state.posts.length === 0) {
      return [
        <span key="0">今日のつぶちゅうまだない
          <span role="img" aria-label="mouse">🐭</span>
        </span>
      ]
    }

    let result = [];
    for(let i in this.state.posts) {
      result.push(
        <Col sm={3} key={i}>
          <Card style={this.cardStyle}>
            <Card.Body>
              <Card.Text>{this.state.posts[i].data.text}</Card.Text>
              <Button size="sm" onClick={() => this.addLikeToPost(this.state.posts[i])}>
                <span role="img" aria-label="mouse">🐭</span>
                &emsp;<span>{this.state.posts[i].data.like}</span>
              </Button>
            </Card.Body>
          </Card>
        </Col>
      )
    }
    return result
  }

  render() {
    return (
      <Container style={this.containerStyle}>
        <Row>{this.setViewPosts()}</Row>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {state};
}

export default connect(mapStateToProps)(Kanban)
