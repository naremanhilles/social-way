import React, { Component } from "react";
import { Button, notification, Modal, Typography, Row, Col, Input } from "antd";
import axios from "axios";

import AccountsTable from "components/utils/AccountsTable";
import "./index.css";
const { Title } = Typography;

export default class PendingAccounts extends Component {
  state = {
    users: [],
    result: [],
    query: "",
    isLoading: true
  };

  async componentDidMount() {
    try {
      const res = await axios.get("/api/v1/admin/pending-users");
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
      await this.setState({ isLoading: false });
    }
  }

  confirmActionOnUser = (userId, message, focusButton, onOk) => {
    const { confirm } = Modal;
    confirm({
      className: "pending-accounts-model",
      title: "Sure?",
      content: message,
      cancelText: "Cancel",
      okText: "Confirm",
      okType: "danger",
      autoFocusButton: focusButton,
      keyboard: true,
      centered: true,
      maskClosable: true,
      onOk: () => onOk(userId),
      onCancel() {
        Modal.destroyAll();
      }
    });
  };

  handleAcceptUser = async userId => {
    try {
      const res = await axios.get(`/api/v1/admin/accept-user/${userId}`);
      const acceptedUser = res.data.data;
      await this.setState({
        users: this.state.users.filter(user => user.id !== acceptedUser.id),
        result: this.state.result.filter(user => user.id !== acceptedUser.id)
      });
      notification.success({
        message: "Sucess",
        description: "User was successfully accepted"
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

  handleRejectUser = async userId => {
    try {
      const res = await axios.get(`/api/v1/admin/reject-user/${userId}`);
      const rejectedUser = res.data.data;
      await this.setState({
        users: this.state.users.filter(user => user.id !== rejectedUser.id),
        result: this.state.result.filter(user => user.id !== rejectedUser.id)
      });
      notification.success({
        message: "Sucess",
        description: "User was successfully rejected"
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
    const { result, query, isLoading } = this.state;
    const actionRender = (text, { id }) => (
      <>
        <Button
          type="sucess"
          onClick={() =>
            this.confirmActionOnUser(
              id,
              "Please confirm you want to accept this user?",
              "ok",
              this.handleAcceptUser
            )
          }
          size="small"
          style={{ marginBottom: 4 }}
        >
          Accept
        </Button>
        <Button
          type="danger"
          onClick={() =>
            this.confirmActionOnUser(
              id,
              "Please confirm you want to reject this user?",
              "cancel",
              this.handleRejectUser
            )
          }
          size="small"
        >
          Reject
        </Button>
      </>
    );
    return (
      <>
        <Row type="flex" justify="center" style={{ padding: "5rem 0 0 0" }}>
          <Col span={23}>
            <Title style={{ fontFamily: "Lato" }}>Pending Accounts : </Title>
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
              loading={isLoading}
              data={result}
              actionRender={actionRender}
              pageSize={5}
            />
          </Col>
        </Row>
      </>
    );
  }
}
