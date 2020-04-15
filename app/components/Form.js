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

  componentWillReceiveProps(nextProps) {
    if(nextProps.projectToEdit) {
      this.setState({
        nameProject: nextProps.projectToEdit.nameProject,
        description: nextProps.projectToEdit.description,
        members: nextProps.projectToEdit.members,
      });
    }
  }

  handleSubmit(){
    const { onSubmit, projectToEdit, onEdit } = this.props;
    const { nameProject, description, members } = this.state;

    if(!projectToEdit) {
      return axios.post('http://localhost:3000/api/projects', {
        nameProject,
        description,
        members,
      })
        .then((res) => onSubmit(res.data))
        .then(() => this.setState({ nameProject: '', description: '', members: '' }));
    } else {
      return axios.patch(`http://localhost:3000/api/projects/${projectToEdit._id}`, {
        nameProject,
        description,
        members,
      })
        .then((res) => onEdit(res.data))
        .then(() => this.setState({ nameProject: '', description: '', members: '' }));
    }
  }

  handleChangeField(key, event) {
    this.setState({
      [key]: event.target.value,
    });
  }

  render() {
    const { projectToEdit } = this.props;
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
        <button onClick={this.handleSubmit} className="btn btn-primary float-right">{projectToEdit ? 'Update' : 'Submit'}</button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch({ type: 'SUBMIT_PROJECT', data }),
  onEdit: data => dispatch({ type: 'SUBMIT_PROJECT', data }),
});

const mapStateToProps = state => ({
  projectToEdit: state.home.projectToEdit,
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);