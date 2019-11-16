import React, { Component } from "react";
import { Button, notification, Modal, Input, Typography, Row, Col } from "antd";
import axios from "axios";

import AccountsTable from "components/utils/AccountsTable/index";
import './index.css';
const { Title } = Typography;

export default class PendingAccounts extends Component {
  state = {
    adminPassword: "",
    query: "",
    users: [],
    result: [],
    isLoading: true
  };

  async componentDidMount() {
    try {
      const res = await axios.get("/api/v1/admin/all-users");
      let users = res.data.data;
      users = users.map(user => {
        user.name = `${user.first_name} ${user.last_name}`;
        user.address = `${user.country}, ${user.city}, ${user.address}, ${
          user.zip_code
        }`;
        user.social_media = [
          { type: "facebook", href: user.facebook },
          { type: "instagram", href: user.instagram },
          { type: "twitter", href: user.twitter }
        ];
        delete user.first_name;
        delete user.last_name;
        delete user.country;
        delete user.city;
        delete user.zip_code;
        delete user.facebook;
        delete user.instagram;
        delete user.twitter;
        return user;
      });
      await this.setState({ users, result: users, isLoading: false });
    } catch (e) {
      if (e.response) {
        notification.error({
          message: "Error",
          description: e.response.data.error
        });
      } else {
        notification.error({
          message: "Error",
          description: e.message
        });
      }
      this.setState({ isLoading: false });
    }
  }

  handleUpdatePassword = event =>
    this.setState({ adminPassword: event.target.value });

  confirmDeleteUser = userId => {
    const { confirm } = Modal;
    confirm({
      title: "Are you sure to delete this user?",
      content: (
        <label>
          <span style={{ display: "block", margin: "20px 0 5px 0" }}>
            Enter your password to confirm this operation:
          </span>
          <Input
            onChange={this.handleUpdatePassword}
            autoFocus={true}
            type="password"
          />
        </label>
      ),
      className: 'delete-user-accounts-page',
      okText: "Confirm",
      okType: "danger",
      cancelText: "Cancel",
      autoFocusButton: "cancel",
      keyboard: true,
      centered: true,
      maskClosable: true,
      onOk: () => {
        this.handleDeleteUser(userId);
      },
      onCancel() {
        Modal.destroyAll();
      }
    });
  };

  handleDeleteUser = async userId => {
    try {
      const deleteUserRes = await axios.delete(
        `/api/v1/admin/delete-user/${userId}`,
        {
          data: { password: this.state.adminPassword }
        }
      );
      const deletedUser = deleteUserRes.data.data;
      this.setState({
        users: this.state.users.filter(user => user.id !== deletedUser.id),
        result: this.state.result.filter(user => user.id !== deletedUser.id)
      });
    } catch (e) {
      if (e.response) {
        notification.error({
          message: "Error",
          description: e.response.data.error
        });
      } else {
        notification.error({
          message: "Error",
          description: e.message
        });
      }
    }
  };
  handleChange = ({ target: { value } }) => {
    const { users } = this.state;
    const result = value
      ? users.filter(user =>
          user.name.toLowerCase().includes(value.toLowerCase())
        )
      : users;
    this.setState({ query: value, result });
  };

  render() {
    const { result, query } = this.state;
    const actionRender = (_, { id }) => (
      <Button
        type="danger"
        onClick={() => this.confirmDeleteUser(id)}
        size="small"
      >
        Delete User
      </Button>
    );

    return (
      <>
        <Row type="flex" justify="center" style={{ padding: "5rem 0 0 0" }}>
          <Col span={23}>
            <Title style={{ fontFamily: "Lato" }}>Users Accounts : </Title>
          </Col>
          <Col span={21} style={{ marginTop: "3rem" }}>
            <Input
              size="large"
              placeholder="Enter Username"
              onChange={this.handleChange}
              value={query}
            />
          </Col>
          <Col span={21} style={{ marginTop: "3rem" }}>
            <AccountsTable
              loading={this.state.isLoading}
              data={result}
              actionRender={actionRender}
              pageSize={6}
            />
          </Col>
        </Row>
      </>
    );
  }
}
