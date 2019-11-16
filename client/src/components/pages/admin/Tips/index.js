import React, { Component } from "react";
import {
  Form,
  Input,
  Button,
  Col,
  Row,
  Typography,
  Select,
  notification
} from "antd";
import { Loading } from "components/pages";
import axios from "axios";

const { Title } = Typography;
const { Option } = Select;

class Tips extends Component {
  state = {
    tips: [],
    isLoading: true,
    isLoadingBtn: false
  };

  componentDidMount = async () => {
    const { setFieldsValue } = this.props.form;
    try {
      const tips = (await axios.get("/api/v1/admin/tips")).data.data;
      this.setState({ tips, isLoading: false });
      tips.map(
        tip =>
          tip.post_type === "publicService" &&
          setFieldsValue({ [tip.tip_title]: tip.tip_description })
      );
    } catch (e) {
      notification.error({
        message: "There is an error",
        description: "please check your internet connection"
      });
      this.setState({ isLoading: false });
    }
  };

  handleTypeChange = value => {
    const { setFieldsValue } = this.props.form;
    const { tips } = this.state;
    tips.map(
      tip =>
        tip.post_type === value &&
        setFieldsValue({ [tip.tip_title]: tip.tip_description })
    );
  };

  handleUpdate = async () => {
    const { tips } = this.state;
    this.setState({ isLoadingBtn: true });
    this.props.form.validateFields(async (err, values) => {
      try {
        await axios.put("/api/v1/admin/tips", values);
        notification.success({
          message: "Sucess",
          description: "Tips successfully updated"
        });
        const newTips = tips.map(tip => {
          if (tip.post_type === values.type) {
            return { ...tip, tip_description: values[tip.tip_title] };
          }
          return tip;
        });
        this.setState({ isLoadingBtn: false, tips: newTips });
      } catch (e) {
        if (e.response && e.response.status === 401) {
          notification.error({
            message: "Error",
            description: "You should be the admin to make these changes"
          });
        } else {
          notification.error({
            message: "Error",
            description: "Sorry There is an error "
          });
        }
        this.setState({ isLoadingBtn: false });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLoading, isLoadingBtn } = this.state;

    return isLoading ? (
      <Loading />
    ) : (
      <div>
        <Row type="flex" justify="center">
          <Col span={22}>
            <br />
            <br />
            <br />
            <Title style={{ fontFamily: "lato" }}> SEO Tips : </Title>
            <Row type="flex" justify="center">
              <Col span={12}>
                <Form>
                  <Form.Item label="Post Type">
                    {getFieldDecorator("type", {
                      initialValue: "publicService"
                    })(
                      <Select size="large" onChange={this.handleTypeChange}>
                        <Option value="publicService">Public Service</Option>
                        <Option value="event">Event</Option>
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item label="Tip for Title">
                    {getFieldDecorator("title")(
                      <Input
                        placeholder="enter the tip of title"
                        size="large"
                      />
                    )}
                  </Form.Item>
                  <Form.Item label="Tip for Image">
                    {getFieldDecorator("image")(
                      <Input
                        placeholder="enter the tip of image"
                        size="large"
                      />
                    )}
                  </Form.Item>
                  <Form.Item label="Tip for description">
                    {getFieldDecorator("description")(
                      <Input
                        placeholder="enter the tip of description"
                        size="large"
                      />
                    )}
                  </Form.Item>
                  <Form.Item>
                    <Button
                      onClick={this.handleUpdate}
                      size="large"
                      loading={isLoadingBtn}
                      style={{ width: "100%" }}
                      type="primary"
                    >
                      Update Tips
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create({ name: "tips_form" })(Tips);
