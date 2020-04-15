import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

var Form = require('./Form.js');

class Projects extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    const { onLoad } = this.props;

    axios('http://localhost:3000/api/projects')
      .then((res) => onLoad(res.data));
  }

  handleDelete(id) {
    const { onDelete } = this.props;

    return axios.delete(`http://localhost:3000/api/projects/${id}`)
      .then(() => onDelete(id));
  }

  handleEdit(project) {
    const { setEdit } = this.props;

    setEdit(project);
  }

  render() {
    const { projects } = this.props;

    return (
      <div className="container">
        <div className="row pt-5">
          <div className="col-12 col-lg-6 offset-lg-3">
            <h1 className="text-center">LightBlog</h1>
          </div>
          <Form />
        </div>
        <div className="row pt-5">
          <div className="col-12 col-lg-6 offset-lg-3">
            {projects.map((project) => {
              return (
                <div className="card my-3">
                  <div className="card-header">
                    {project.title}
                  </div>
                  <div className="card-body">
                    {project.body}
                    <p className="mt-5 text-muted"><b>{project.author}</b> {moment(new Date(project.createdAt)).fromNow()}</p>
                  </div>
                  <div className="card-footer">
                    <div className="row">
                      <button onClick={() => this.handleEdit(project)} className="btn btn-primary mx-3">
                        Edit
                      </button>
                      <button onClick={() => this.handleDelete(project._id)} className="btn btn-danger">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.home.projects,
});

const mapDispatchToProps = dispatch => ({
  onLoad: data => dispatch({ type: 'HOME_PAGE_LOADED', data }),
  onDelete: id => dispatch({ type: 'DELETE_PROJECT', id }),
  setEdit: project => dispatch({ type: 'SET_EDIT', project}),
});



export default connect(mapStateToProps, mapDispatchToProps)(Projects);