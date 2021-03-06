import React from 'react'
import Auth from '../lib/Auth'
import axios from 'axios'
import ReactFilestack from 'filestack-react'

const choices = {
  accept: 'image/*',
  transformations: {
    rotate: true,
    crop: true,
    circle: true
  }
}

class CabinEdit extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {},
      errors: {},
      file: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUploadedImages = this.handleUploadedImages.bind(this)
  }

  handleChange(e) {
    const data = {...this.state.data, [e.target.name]: e.target.value}
    this.setState({ data })
  }
  handleSubmit(e) {
    e.preventDefault()
    const token = Auth.getToken()

    axios.put(`/api/cabins/${this.state.data._id}`, this.state.data, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(() => this.props.history.push('/cabins'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  componentDidMount() {
    axios.get(`api/cabins/${this.props.match.params.id}`)
      .then(res => this.setState({ data: res.data }))
  }


  handleUploadedImages(result) {
    console.log(this.state.data)
    const data = { ...this.state.data, image: result.filesUploaded[0].url }
    this.setState({ data })
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-half-desktop is-two-thirds-tablet">
              <form onSubmit={this.handleSubmit}>
                <div className="field">
                  <label className="label">Title</label>
                  <div className="control">
                    <input
                      className="input"
                      name="title"
                      value={this.state.data.title || ''}
                      placeholder="eg: Sea View Sanctuary"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                {this.state.errors.title && <div className="help is-danger">{this.state.errors.title}</div>}


                <div className="field">

                  <label className="label">Image</label>
                  <ReactFilestack
                    apikey="A0y7LFvTfTXGeE0Xy0f9vz"
                    buttonText="Upload Photo Cabin"
                    buttonClass="button"
                    options={choices}
                    preload={true}
                    onSuccess={this.handleUploadedImages}
                  />
                  {this.state.data.image && <img src={this.state.data.image} />}
                  {this.state.errors.image && <div className="help is-danger">{this.state.errors.image}</div>}
                </div>

                {this.state.errors.image && <div className="help is-danger">{this.state.errors.image}</div>}
                <div className="field">
                  <label className="label">Price</label>
                  <div className="control">
                    <input
                      className="input"
                      name="price"
                      placeholder="eg: £200"
                      value={this.state.data.price || ''}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                {this.state.errors.price && <div className="help is-danger">{this.state.errors.price}</div>}
                <div className="field">
                  <label className="label">Sleeps</label>
                  <div className="control">
                    <input
                      className="input"
                      name="sleeps"
                      placeholder="eg: 4"
                      value={this.state.data.sleeps || ''}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                {this.state.errors.sleeps && <div className="help is-danger">{this.state.errors.sleeps}</div>}
                <div className="field">
                  <label className="label">Address</label>
                  <div className="control">
                    <input
                      className="input"
                      name="address"
                      placeholder="eg: 1 Seaside Avenue, Hastings"
                      value={this.state.data.address || ''}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                {this.state.errors.address && <div className="help is-danger">{this.state.errors.address}</div>}

                <div className="field">
                  <label className="label">Postcode</label>
                  <div className="control">
                    <input
                      className="input"
                      name="postcode"
                      placeholder="eg: SE1 4NN"
                      value={this.state.data.postcode || ''}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                {this.state.errors.postcode && <div className="help is-danger">{this.state.errors.postcode}</div>}



                <div className="field">
                  <label className="label">Description</label>
                  <div className="control">
                    <textarea
                      className="textarea"
                      type="textarea"
                      name="description"
                      placeholder="eg: A tranquil lakeside cabin, just moments from the unspoilt golden sands of the Sussex coast."
                      value={this.state.data.description || ''}
                      onChange={this.handleChange} />
                  </div>

                  {this.state.errors.description && <div className="help is-danger">{this.state.errors.description}</div>}
                </div>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      className="input"
                      name="email"
                      placeholder="eg: valeria@example.co.uk"
                      value={this.state.data.email || ''}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                {this.state.errors.email && <div className="help is-danger">{this.state.errors.email}</div>}
                <button className="button is-light is-large">
                  <p>Submit</p>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
export default CabinEdit
