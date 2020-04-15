import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nameProject: '',
      description: '',
      members: '',
    }

    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(){
    const { onSubmit } = this.props;
    const { nameProject, description, members } = this.state;

    return axios.post('http://localhost:3000/api/projects', {
      nameProject,
       description,
        members
    })
      .then((res) => onSubmit(res.data));
  }

  handleChangeField(key, event) {
    this.setState({
      [key]: event.target.value,
    });
  }

  render() {
    const { nameProject, description, members } = this.state;

    return (
      <div className="col-12 col-lg-6 offset-lg-3">
        <input
          onChange={(ev) => this.handleChangeField('nameProject', ev)}
          value={nameProject}
          className="form-control my-3"
          placeholder="Name Project"
        />
        <textarea
          onChange={(ev) => this.handleChangeField('description', ev)}
          className="form-control my-3"
          placeholder="Description"
          value={description}>
        </textarea>
        <input
          onChange={(ev) => this.handleChangeField('members', ev)}
          value={members}
          className="form-control my-3"
          placeholder="Members"
        />
        <button onClick={this.handleSubmit} className="btn btn-primary float-right">Submit</button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch({ type: 'SUBMIT_PROJECT', data }),
});

export default connect(null, mapDispatchToProps)(Form);