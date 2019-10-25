import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNode } from '../../actions';
class NodeFormReview extends Component {
  onSubmitForm() {
    this.props.addNode(this.props.formValues).then(() => {
      //this.props.history.push('/dashboard');
    });
  }
  render() {
    return (
      <div>
        <h3> Please confirm your entries </h3>
        <label>Name</label>
        <div>{this.props.formValues.name}</div>
        <label>Device Privacy</label>
        <div>{this.props.formValues.dataPrivacy}</div>
        <label>Device Type</label>
        <div>{this.props.formValues.deviceType}</div>
        <br />
        <button
          className="yellow white-text darken-3 btn-flat"
          onClick={this.props.onCancel}
        >
          Back
        </button>
        <button
          className="btn waves-effect waves-light right white-text"
          type="submit"
          name="action"
          onClick={this.onSubmitForm.bind(this)}
        >
          Submit
          <i className="material-icons right">send</i>
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { formValues: state.form.nodeForm.values };
}
export default connect(mapStateToProps, { addNode })(NodeFormReview);
