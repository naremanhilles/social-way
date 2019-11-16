import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Input, Modal, notification } from "antd";

import Button from "components/utils/Button";
import "./style.css";
import "../modal.css"
import axios from "axios";

class ProfilePersonal extends Component {
  state = {
    confirmDirty: false,
    visiable: false,
    password: '',
  };

  componentDidMount = () => {
    this.props.form.setFieldsValue(this.props.personal);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        axios.put('/api/v1/user/personal', { ...values, oldPassword: this.state.password })
          .then(({ data: { data } }) => {
            if (data) {
              notification.success({ message: 'Success', description: 'Updated Successfully!' });
              this.setState({ visible: false })
            }
          })
          .catch(({ response: { data } }) => {
            const { statusCode, error } = data;
            if (statusCode) {
              notification.error({ message: 'ERROR', description: error });
            }
          })
      }
    });
  };

  handleCancel = (e) => {
    e.preventDefault();
    this.props.history.push('/posts')
  };

  handlePassword = (e) => {
    this.setState({ password: e.target.value })
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
  }

  render() {
    const {
      form: { getFieldDecorator }
    } = this.props;

    return (
      <Form
        className="profile-page--form-personal"
      >
        <Form.Item
          label="First Name"
          required={false}
          className="profile-page--form-item"
        >
          {getFieldDecorator("firstName", {
            rules: [
              {
                type: "string",
                message: "The First Name should be string!"
              },
              {
                whitespace: true,
                message: "Delete the spaces!"
              },
              {
                min: 3,
                message: "First Name must be 3 charcter at least!"
              },
              {
                required: true,
                message: "Please Enter your First Name!"
              }
            ]
          })(<Input placeholder="Your First Name" />)}
        </Form.Item>

        <Form.Item
          label="Last Name"
          required={false}
          className="profile-page--form-item"
        >
          {getFieldDecorator("lastName", {
            rules: [
              {
                type: "string",
                message: "The Last Name should be string!"
              },
              {
                whitespace: true,
                message: "Delete the spaces!"
              },
              {
                min: 3,
                message: "Last Name must be 3 charcter at least!"
              },
              {
                required: true,
                message: "Please Enter your Last Name!"
              }
            ]
          })(<Input placeholder="Your Last Name" />)}
        </Form.Item>

        <Form.Item
          label="Email"
          required={false}
          className="profile-page--form-item"
        >
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              {
                required: true,
                message: "Please input your E-mail!"
              }
            ]
          })(<Input placeholder="Email" />)}
        </Form.Item>

        <Form.Item className="profile-page--form-btns">
          <Button
            type="submit"
            className="profile-page--form-btn-save"
            onClick={this.showModal}
          >
            Save
          </Button>
          <Modal
            className='profile--password-popup'
            title="Confirm Password"
            visible={this.state.visible}
            onOk={this.handleSubmit}
            onCancel={this.hideModal}
          >
            <label>Your Password</label>
            <input className='profile--password-input' type='password' value={this.state.password} onChange={this.handlePassword} />
          </Modal>

          <Button
            className="profile-page--form-btn-cancel"
            onClick={this.handleCancel}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

ProfilePersonal.propTypes = {
  personal: PropTypes.object.isRequired
};

export default Form.create({ name: "Profile_Personal" })(ProfilePersonal);
