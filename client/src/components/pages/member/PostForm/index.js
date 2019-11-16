import React from "react";
import { Divider, Select, notification } from "antd";
import axios from "axios";

import WrappedEventForm from "components/pages/member/PostForm/Event";
import WrappedPublicServices from "components/pages/member/PostForm/PublicServices";
import Spin from "components/pages/Loading";

import "./style.css";

const { Option } = Select;

export default class CreatPostPage extends React.Component {
  state = {
    postType: this.props.postFormType || "event",
    eventTypeValues: [],
    eventTopicValues: [],
    primaryTag: [],
    secondaryTag: [],
    tips: [],
    isLoading: true
  };

  async componentDidMount() {
    try {
      const eventRespons = await axios.get("/api/v1/post/event/static");
      const PublicServicesResponse = await axios.get(
        "/api/v1/post/public-service/static"
      );
      const tips = (await axios.get("/api/v1/post/tips")).data.data;
      const { categories, topics } = eventRespons.data.data;
      const { primaryTags, secondaryTags } = PublicServicesResponse.data.data;
      await this.setState({
        eventTypeValues: categories,
        eventTopicValues: topics,
        primaryTag: primaryTags,
        secondaryTag: secondaryTags,
        isLoading: false,
        tips
      });
    } catch (err) {
      notification.error({
        message: "Error",
        description: "There is an error try again"
      });
    }
  }

  handlePostTypeChange = e => this.setState({ postType: e });

  render() {
    const postTypes = [
      { key: 1, value: "event" },
      { key: 2, value: "public services" }
    ];

    const {
      postType,
      eventTypeValues,
      eventTopicValues,
      primaryTag,
      secondaryTag
    } = this.state;

    const { id } = this.props.match.params;

    return (
      <section className="create-post-page-main">
        <h1 style={{ margin: 0, fontFamily: "Roboto", fontSize: 24 }}>
          {id ? "Edit your Post" : "Publish New Post"}
        </h1>
        <Divider style={{ margin: "0 0 30px 0" }} />
        <h4 style={{ fontFamily: "Roboto" }}>Post Type</h4>
        <Select
          defaultValue={postType}
          placeholder="Post Type"
          onChange={this.handlePostTypeChange}
          size="large"
          disabled={id ? true : false}
        >
          {postTypes.map(({ key, value }) => (
            <Option key={key} value={value}>
              {value}
            </Option>
          ))}
        </Select>
        <Divider style={{ margin: "20px 0" }} />
        {!this.state.isLoading ? (
          postType === "event" ? (
            <WrappedEventForm
              {...this.props}
              id={id}
              tips={this.state.tips.filter(
                tip => tip && tip.post_type === "event"
              )}
              postType={postType}
              eventTopicValues={eventTopicValues}
              eventTypeValues={eventTypeValues}
            />
          ) : (
            <WrappedPublicServices
              {...this.props}
              id={id}
              tips={this.state.tips.filter(
                tip => tip && tip.post_type === "publicService"
              )}
              postType={postType}
              primaryTag={primaryTag}
              secondaryTags={secondaryTag}
            />
          )
        ) : (
          <Spin />
        )}
      </section>
    );
  }
}
