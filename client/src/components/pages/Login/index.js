import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Form, Icon, Input, Checkbox, notification } from "antd";
import axios from "axios";

import Button from "components/utils/Button";
import "./style.css";

function LoginPage(props) {
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, { email, password, rememberMe }) => {
      if (!err) {
        axios
          .post("/api/v1/login", {
            email,
            password,
            rememberMe
          })
          .then(({ data: { data } }) => {
            props.handleLogin(data);
            data.role === "admin"
              ? props.history.push("/admin")
              : props.history.push("/posts");
          })
          .catch(err => {
            const {
              response: {
                data: { error, statusCode }
              }
            } = err;
            let notificationObj = {};
            switch (statusCode) {
              case 400:
                notificationObj = {
                  message: "Bad Request",
                  description: error
                };
                break;
              case 401:
                notificationObj = {
                  message: "Unauthorized",
                  description: error
                };
                break;
              default:
                notificationObj = {
                  message: "Internal Server Error",
                  description:
                    "Something went wrong with server, please try again later"
                };
            }
            notification.error(notificationObj);
          });
      }
    });
  };

  const {
    form: { getFieldDecorator }
  } = props;

  return (
    <Fragment>
      <main className="login-page--main-section">
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Item label="Email Address">
            {getFieldDecorator("email", {
              rules: [
                { required: true, message: "Email address is required!" },
                {
                  type: "email",
                  message: "Please enter a valid email address"
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="example@example.com"
                className="login-form--input"
              />
            )}
          </Form.Item>

          <Form.Item label="Password">
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please enter your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
                className="login-form--input"
              />
            )}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator("rememberMe", {
              valuePropName: "checked",
              initialValue: false
            })(<Checkbox>Remember me</Checkbox>)}
          </Form.Item>

          <div className="login-form--submit-div">
            <Button type="submit">Log in</Button>
            <span className="form--create-acc">
              Don't have an account?
              <Link to="/signup" className="login-form--signup-link">
                Sign up
              </Link>
              now
            </span>
          </div>
        </Form>
      </main>
    </Fragment>
  );
}
export default Form.create({ name: "Login_Form" })(LoginPage);
