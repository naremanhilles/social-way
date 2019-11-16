import React from "react";
import PropTypes from "prop-types";

import {
  Form,
  Tooltip,
  Icon,
  Upload,
  Divider,
  Card,
  Button,
  Input,
  notification
} from "antd";
import axios from "axios";
import moment from "moment";

import { InputAntd, TextAreaAntd, DropDownAntd } from "components/utils";
import { Button as Btn } from "components/utils";
import "./style.css";

const InputGroup = Input.Group;

class PublicServicesForm extends React.Component {
  state = {
    isDraft: true, 
    currentImg: '',
  };

  async componentDidMount() {
    try {
      const {
        form: { setFieldsValue },
        id
      } = this.props;

      if (id) {
        const getRes = await axios.get(`/api/v1/post/${id}`, {
          params: {
            postType: "public_service"
          }
        });
        const publicService = getRes.data.data[0];
        publicService.primaryTag = publicService.primary_tag;
        publicService.secondaryTag = getRes.data.data.map(
          publicService => publicService.secondary_tag_id
        );
        publicService.altText = publicService.alt_text;
        publicService.focusKey = publicService.focus_key;
        publicService.publishDatetime = moment().format();

        delete publicService.primary_tag;
        delete publicService.secondary_tag_id;
        delete publicService.secondary_tag;
        delete publicService.alt_text;
        delete publicService.focus_key;
        this.setState({ isDraft: publicService.is_draft, currentImg: publicService.image }, () => {
          setFieldsValue(publicService);
        });
      }
    } catch (err) {
      if (Number(err.statusCode) === 400) {
        notification.error({
          message: "Bad Request",
          description: err.message
        });
      } else if (Number(err.statusCode) === 401) {
        notification.error({
          message: "Unauthorized",
          description: err.message
        });
      } else if (Number(err.statusCode) === 500) {
        notification.error({
          message: "Internal Server Error",
          description: err.message
        });
      } else {
        notification.error({
          message: "Error",
          description: "Something went wrong please try again later"
        });
      }
      this.props.history.push("/");
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { textContent } = e.target;
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      try {
        if (err) {
          notification.error({
            message: "Error",
            description: "Validation Error"
          });
        } else {
          const { id } = this.props;
          values.type = "public_services";
          values.publishDatetime = moment().format();
          if (textContent === "Publish") values.isDraft = "false";
          if (textContent === "Preview" || textContent === "Save Draft")
            values.isDraft = "true";
          if (textContent === "Save") values.isDraft = this.state.isDraft;
          const formData = new FormData();
          const file = this.uploadInput.state.fileList.length
            ? this.uploadInput.state.fileList[0].originFileObj
            : null;
          formData.append("data", JSON.stringify(values));
          formData.append("image", file);

          let resPost;

          //Edit Post//
          if (
            (id && textContent === "Save") ||
            (id && textContent === "Publish")
          ) {
            resPost = await axios.put(`/api/v1/post/${id}`, formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            });
            if (resPost.data.data.id && textContent === "Publish")
              notification.success({
                message: "Successfully",
                description: "Post was published successfully"
              });
            else if (resPost.data.data.id)
              notification.success({
                message: "Successfully",
                description: "Post updated successfully"
              });
          }

          //Post New Post: Draft or Live//
          if (
            (!id && textContent === "Publish") ||
            textContent === "Save Draft" ||
            textContent === "Preview"
          ) {
            resPost = await axios.post("/api/v1/post", formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            });
            if (resPost.data.data.is_draft)
              notification.success({
                message: "Successfully",
                description: "Post saved as a draft"
              });
            else {
              notification.success({
                message: "Successfully",
                description: "Post was published successfully!"
              });
            }
          }
          const { id: postId, primary_tag } = await resPost.data.data;
          const primaryTags = this.props.primaryTag;
          const tagId = primaryTags.findIndex(({ id }) => id === primary_tag);
          const tag = primaryTags[tagId].tag
            .toLowerCase()
            .replace(" and ", "-");

          //Redirect
          this.props.history.push(`/post/public-service/${tag}/${postId}`);
        }
      } catch (err) {
        if (Number(err.statusCode) === 400) {
          notification.error({
            message: "Bad Request",
            description: err.message
          });
        } else if (Number(err.statusCode) === 500) {
          notification.error({
            message: "Internal Server Error",
            description: err.message
          });
        } else {
          notification.error({
            message: "Error",
            description: "There is an error try again"
          });
        }
      }
    });
  };

  render() {
    const {
      id,
      tips = [],
      primaryTag,
      secondaryTags,
      form: { getFieldDecorator, getFieldValue }
    } = this.props;
    const publicServicesPrimaryTag = primaryTag.map(element => {
      return { id: element.id, value: element.tag };
    });
    const publicServicesSecondaryTag = secondaryTags.map(element => {
      return { id: element.id, value: element.tag };
    });
    const urlType = getFieldValue("primaryTag");
    return (
      <Form className="main--eventForm">
        <InputGroup size="large">
          <InputAntd
            withTip
            label="Title"
            tipInfo={
              tips.filter(tip => tip.tip_title === "title")[0].tip_description
            }
            getFieldDecorator={getFieldDecorator}
            name="title"
            validationMsg="Please input your Public Services"
            placeholder="Public Services Title"
            validation={{ max: 60 }}
          />
        </InputGroup>
        <DropDownAntd
          label="Primary Tag"
          getFieldDecorator={getFieldDecorator}
          name="primaryTag"
          required
          validationMsg="Please select your Primary Tag!"
          placeholder="Primary Tag"
          handleSelectChange={this.handleSelectChange}
          optionsMenu={publicServicesPrimaryTag}
        />
        <DropDownAntd
          mode="multiple"
          label="Secondary Tag"
          getFieldDecorator={getFieldDecorator}
          name="secondaryTag"
          required
          validationMsg="Please select your Secondary Tag!"
          placeholder="Secondary Tag"
          handleSelectChange={this.handleSelectChange}
          optionsMenu={publicServicesSecondaryTag}
        />
        <TextAreaAntd
          withTip
          tipInfo={
            tips.filter(tip => tip.tip_title === "description")[0]
              .tip_description
          }
          label="Description"
          getFieldDecorator={getFieldDecorator}
          name="description"
          validationMsg="Please input your description!"
          placeholder="Enter Event Description"
          min={10}
          max={false}
        />
        <Form.Item
          label={
            <span>
              Image&nbsp;
              <Tooltip
                title={
                  tips.filter(tip => tip.tip_title === "image")[0]
                    .tip_description
                }
              >
                <Icon type="info-circle" />{" "}
              </Tooltip>
            </span>
          }
        >
          {
            <Upload
              key={this.state.currentImg}
              accept="image/*"
              style={{ width: "100%" }}
              customRequest={() => { }}
              listType="picture"
              ref={element => (this.uploadInput = element)}
            >
              <Button size="large">
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>
          }
        </Form.Item>
        <InputAntd
          withTip={false}
          label="Alt-Text"
          tipInfo={
            tips.filter(tip => tip.tip_title === "image")[0].tip_description
          }
          getFieldDecorator={getFieldDecorator}
          name="altText"
          validationMsg="Please input Alt Text For Image!"
          placeholder="Your Alt Text For Image"
        />
        <Divider style={{ margin: "20px 0" }} />
        <InputGroup size="large">
          <InputAntd
            withTip={false}
            label="Focus Keyword"
            getFieldDecorator={getFieldDecorator}
            name="focusKey"
            validationMsg="Please input your keyword!"
            placeholder="Your main keyword"
          />
        </InputGroup>
        <Card
          title={
            <>
              Event Title
              <br />
              <span style={{ color: "#f36f18" }}>
                www.socialstreets.co/events/{urlType && urlType}
              </span>
            </>
          }
          bordered
          style={{ width: "100%", marginBottom: "20px" }}
        >
          <TextAreaAntd
            withTip={false}
            style={{ fontSize: "15px" }}
            label="Meta Description"
            getFieldDecorator={getFieldDecorator}
            name="meta"
            validationMsg="Please input your Meta Description!"
            placeholder="Your main Meta Description"
            min={5}
            max={false}
          />
        </Card>
        <Form.Item>
          {!id || (id && this.state.isDraft) ? (
            <Btn
              className="main--form-btn"
              name="publish"
              type="primary"
              htmlType="submit"
              onClick={this.handleSubmit}
            >
              Publish
            </Btn>
          ) : (
              ""
            )}
          <Btn
            className="main--form-btn"
            name="save"
            type="primary"
            htmlType="submit"
            onClick={this.handleSubmit}
          >
            {!id && this.state.isDraft ? "Save Draft" : "Save"}
          </Btn>
          {!id ? (
            <Btn
              className="main--form-btn-gradient main--form-btn"
              type="primary"
              htmlType="submit"
              onClick={this.handleSubmit}
            >
              Preview
            </Btn>
          ) : (
              ""
            )}
          <Btn
            className="main--form-btn-black main--form-btn"
            onClick={() => this.history.push("/posts")}
            type="primary"
            htmlType="submit"
          >
            Cancel
          </Btn>
        </Form.Item>
      </Form>
    );
  }
}
const WrappedPublicServices = Form.create({ name: "publicServicesForm" })(
  PublicServicesForm
);

WrappedPublicServices.propTypes = {
  primaryTag: PropTypes.array.isRequired,
  secondaryTags: PropTypes.array.isRequired
};

export default WrappedPublicServices;
