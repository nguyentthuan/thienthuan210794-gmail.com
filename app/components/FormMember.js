import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';

class FormMembers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullname: '',
      phone: '',
      birthday: '',
    }

    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(){
    const { onSubmit } = this.props;
    const { fullname, phone, birthday } = this.state;

    return axios.post('http://localhost:3000/api/members', {
      fullname,
       phone,
        birthday,
    })
      .then((res) => onSubmit(res.data));
  }

  handleChangeField(key, event) {
    this.setState({
      [key]: event.target.value,
    });
  }

  render() {
    const { fullname, phone, birthday } = this.state;

    return (
      <div className="col-12 col-lg-6 offset-lg-3">
        <input
          onChange={(ev) => this.handleChangeField('fullname', ev)}
          value={fullname}
          className="form-control my-3"
          placeholder="Fullname"
        />
        <textarea
          onChange={(ev) => this.handleChangeField('phone', ev)}
          className="form-control my-3"
          placeholder="Phone"
          value={phone}>
        </textarea>
        <input
          onChange={(ev) => this.handleChangeField('birthday', ev)}
          value={birthday}
          className="form-control my-3"
          placeholder="Birthday"
        />
        <button onClick={this.handleSubmit} className="btn btn-primary float-right">Submit</button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch({ type: 'SUBMIT_MEMBER', data }),
});

export default connect(null, mapDispatchToProps)(FormMembers);