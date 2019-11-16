import React, { Component } from "react";
import {
  Typography,
  Row,
  Col,
  Form,
  Input,
  Button,
  Table,
  Select,
  Tag,
  notification
} from "antd";
import axios from "axios";

const { Title } = Typography;
const { Option } = Select;

class index extends Component {
  state = {
    posts: [],
    type: "event",
    isLoading: false
  };
  handleSubmit = () => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({ isLoading: true });
        try {
          const posts = (await axios.get("/api/v1/admin/posts", {
            headers: {
              post_type: values.type,
              post_query: values.organizationName
            }
          })).data.data;
          this.setState({ posts, type: values.type, isLoading: false });
        } catch (e) {
          const { statusCode, message } = e.response.data;
          if (statusCode === 401) {
            notification.error({
              message: "Un Authorized",
              description: "You can't get this data"
            });
          } else {
            notification.error({ message: "Error", description: message });
          }
          this.setState({ isLoading: false });
        }
      }
    });
  };
  render() {
    const { type } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ height: "100%" }}>
        <Row style={{ padding: "5rem 2rem 0 2rem" }}>
          <Col span={20}>
            <Title style={{ fontFamily: "lato" }}> Posts : </Title>
          </Col>
        </Row>
        <Row type="flex" justify="space-around">
          <Col span={20}>
            <Form>
              <Row type="flex" justify="space-around">
                <Col span={15}>
                  <Form.Item label="Organization Name">
                    {getFieldDecorator("organizationName", {
                      rules: [
                        {
                          required: true,
                          message: "Organization name required"
                        }
                      ]
                    })(
                      <Input
                        placeholder="Enter organization name"
                        size="large"
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label="Type">
                    {getFieldDecorator("type", {
                      initialValue: "event"
                    })(
                      <Select size="large">
                        <Option value="event">Event</Option>
                        <Option value="publicService">Public Service</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label="Search">
                    <Button
                      type="primary"
                      size="large"
                      htmlType="submit"
                      style={{ background: "#1890ff" }}
                      onClick={this.handleSubmit}
                    >
                      Search
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span={20}>
            {type &&
              (type === "event" ? (
                <Table
                  dataSource={this.state.posts}
                  loading={this.state.isLoading}
                >
                  <Table.Column
                    title="Organisation"
                    dataIndex="organisation_name"
                  />
                  <Table.Column title="Title" dataIndex="title" />
                  <Table.Column
                    title="Type"
                    render={(text, record, index) => "event"}
                  />
                  <Table.Column title="Category" dataIndex="category" />
                  <Table.Column title="Venue" dataIndex="venue" />
                  <Table.Column title="Start Date" dataIndex="start_date" />
                  <Table.Column title="End Date" dataIndex="publish_datetime" />
                  <Table.Column title="Webiste" dataIndex="website" />
                  <Table.Column
                    title="topcis"
                    dataIndex="topics"
                    render={(text, record, index) => (
                      <span>
                        {record.topics.map(topic => (
                          <Tag color="blue" key={topic}>
                            {topic}
                          </Tag>
                        ))}
                      </span>
                    )}
                  />
                  <Table.Column title="Cost" dataIndex="cost" />
                </Table>
              ) : (
                <Table
                  dataSource={this.state.posts}
                  loading={this.state.isLoading}
                >
                  <Table.Column
                    title="Organisation"
                    dataIndex="organisation_name"
                  />{" "}
                  <Table.Column title="Title" dataIndex="title" />
                  <Table.Column
                    title="Type"
                    render={(text, record, index) => "event"}
                  />
                  <Table.Column title="Primary Tag" dataIndex="tag" />
                  <Table.Column
                    title="Secondary Tags"
                    dataIndex="secondaryTags"
                    render={(text, record, index) => (
                      <span>
                        {record.secondaryTags.map(tag => (
                          <Tag color="blue" key={tag}>
                            {tag}
                          </Tag>
                        ))}
                      </span>
                    )}
                  />
                  <Table.Column
                    title="Publish Date"
                    dataIndex="publish_datetime"
                  />
                </Table>
              ))}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create({ name: "posts_form" })(index);
