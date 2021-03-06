import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Auth from '../lib/Auth'

import CabinMap from './CabinMap'

class CabinShow extends React.Component{

  constructor(props){
    super(props)

    this.state={
      cabin: null
    }

    this.handleDelete = this.handleDelete.bind(this)
    this.startConversation = this.startConversation.bind(this)
  }

  componentDidMount() {
    axios.get(`/api/cabins/${this.props.match.params.id}`)
      .then(res => this.setState({ cabin: res.data }))
  }

  handleDelete() {
    const token = Auth.getToken()
    axios.delete(`/api/cabins/${this.props.match.params.id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(() => this.props.history.push('/cabins'))
  }

  canModify() {
    return Auth.isAuthenticated() && Auth.getPayload().sub === this.state.cabin.createdBy._id
  }

  startConversation() {
    const token = Auth.getToken()
    const data = {
      cabin: this.state.cabin._id,
      to: this.state.cabin.createdBy._id
    }
    axios.post('/api/conversations', data, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => this.props.history.push(`/conversations/${res.data._id}`))
  }



  render(){
    console.log(this.state, 'this.state. on the show page')
    const state = this.state.cabin
    if (!this.state.cabin) return null
    return (
      <section className="section show">
        <div className="container">
          <div className="level">
            <div className="level-left">
              <h1 className="title is-1">{state.title}</h1>
            </div>
            {this.canModify() &&
            <div className="level-right">
              <Link to={`/cabins/${state._id}/edit`} className="button is-primary"><p className="title is-5">Edit</p></Link>
              <button className="button is-danger" onClick={this.handleDelete}><p className="title is-5">Delete</p></button>
            </div>
            }
          </div>
          <hr />
          <div className="columns is-multiline">
            <div className="column is-half-desktop is-full-tablet">
              <figure className="image">
                <img src={state.image} alt={state.title} />
              </figure>
            </div>
            <div className="column">
              <div className="columns is-half-desktop is-full-tablet">
                <div className="column">
                  <p className="title is-5">Sleeps: {state.sleeps}</p>
                  <hr />
                </div>
                <div className="column">
                  <p className="title is-5">Price: {state.price}</p>
                  <hr />
                </div>
                <hr />
              </div>
              <div className="column">
                <h2 className="title is-5">Address: {state.address}</h2>
                <hr />
              </div>
              <div className="column">
                <h2 className="title is-5">Description: {state.description}</h2>
                <hr />
              </div>

              <div className="column is-one-half">
                <h2 className="title is-5">Owner: {state.createdBy.username}</h2>
                <hr />
              </div>

              {!this.canModify() && <div>
                <button onClick={this.startConversation}>Check Availability</button>
              </div>}

            </div>
            <CabinMap data={state} />
          </div>
        </div>
      </section>
    )
  }
}

export default CabinShow
