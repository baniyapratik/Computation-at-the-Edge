import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import NodeField from './NodeField';
import './style.css';

class NodeForm extends Component {
  componentDidMount() {
    const script = document.createElement('script');

    script.src = "$('.ui.radio.checkbox').checkbox()";
    script.async = true;

    document.body.appendChild(script);
  }
  renderFields() {
    return (
      <div>
        <div className="grouped fields">
          <span>Data Privacy</span>
          <div className="field">
            <div className="ui radio checkbox">
              <label style={{ padding: '5px' }}>
                <Field
                  name="dataPrivacy"
                  component="input"
                  type="radio"
                  className=" with-gap"
                  value="Public"
                />
                <span>Public</span>
              </label>
            </div>
            <div className="ui radio checkbox">
              <label style={{ padding: '5px' }}>
                <Field
                  name="dataPrivacy"
                  component="input"
                  type="radio"
                  className="with-gap"
                  value="Private"
                />
                <span>Private</span>
              </label>
            </div>
          </div>
        </div>
        <div className="grouped fields">
          <div className="ui radio checkbox">
            <span>Device Type</span>

            <label style={{ padding: '5px' }}>
              <Field
                name="deviceType"
                component="input"
                type="radio"
                className="with-gap"
                value="Web-cam"
              />
              <span>web-cam</span>
            </label>
          </div>
          <div className="ui radio checkbox">
            <label style={{ padding: '5px' }}>
              <Field
                name="deviceType"
                component="input"
                type="radio"
                className="with-gap"
                value="heat-sensor"
              />
              <span>heat-sensor</span>
            </label>
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <form
        className="ui form"
        onSubmit={this.props.handleSubmit(this.props.onFormSubmit)}
      >
        <div className="field">
          <Field
            label="Node Name"
            type="text"
            name="name"
            component={NodeField}
          />
        </div>
        <div>
          <label>Sex</label>
          <div>
            <label>
              <Field name="sex" component="input" type="radio" value="male" />{' '}
              Male
            </label>
            <label>
              <Field name="sex" component="input" type="radio" value="female" />{' '}
              Female
            </label>
            <label>
              <Field name="sex" component="input" type="radio" value="other" />{' '}
              Other
            </label>
          </div>
        </div>
        {this.renderFields()}
        <Link to="/dashboard" className="ui yellow button">
          Cancel
        </Link>

        <button type="submit" className="ui teal button">
          Next
        </button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.name) {
    errors.name = 'You must provide a name';
  }
  if (!values.dataPrivacy) {
    errors.dataPrivacy = 'You must select one privacy type';
  }
  if (!values.deviceType) {
    errors.deviceType = 'You must select one data type';
  }
  return errors;
}
export default reduxForm({
  validate,
  form: 'nodeForm',
  destroyOnUnmount: false
})(NodeForm);
