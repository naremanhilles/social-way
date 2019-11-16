import React, { Component } from "react";
import axios from "axios";
import { Icon, notification, Spin } from "antd";
import moment from "moment";

import Button from "components/utils/Button";
import "./style.css";

export default class PublicService extends Component {
  state = {};

  componentDidMount() {
    const { id } = this.props.match.params;
    // fetch
    axios
      .get(`/api/v1/post/${id}`, {
        params: {
          postType: "public_service"
        }
      })
      .then(res => {
        res.data.data[0].secondary_tag = res.data.data.map(
          res => res.secondary_tag
        );
        this.setState({ ...res.data.data[0] });
      })
      .catch(err => {
        const { statusCode, error } = err.response.data;
        const errObj = {
          message: "Error",
          description: "There is Error please try again"
        };
        if (statusCode === 500) {
          errObj.message = "Server Error";
          errObj.description = "Internal Server Error, Please try again later";
        } else if (statusCode === 400) {
          errObj.message = "Validation Error";
          errObj.description = error;
        }
        notification.error(errObj);
      });
  }
  handleBack = event => {
    event.preventDefault();
  };

  render() {
    const {
      image,
      title,
      publish_datetime,
      organisation_name,
      tag,
      description,
      secondary_tag
    } = this.state;

    const pargraphs = description ? description.split("\n") : null;

    return (
      <section className="public-service-page--main">
        {!title ? (
          <Spin
            className="publicService-spin"
            tip="Loading..."
            size="large"
            indicator={<Icon type="loading" style={{ fontSize: 50 }} spin />}
          />
        ) : (
          <>
            <img
              className="public-service--thumbnail-img"
              src={`/${image}`}
              alt={title}
            />
            <h1 className="public-service--title">{title}</h1>
            <div className="post-header--container">
              <div className="post-header--column">
                <div className="post-header--item">
                  <Icon type="calendar" className="post-header--icon" />
                  <h5 className="post-header--meta">
                    {moment(publish_datetime).format("ll") +
                      moment(publish_datetime)
                        .startOf("hour")
                        .fromNow()}
                  </h5>
                </div>
                <div className="post-header--item">
                  <Icon type="tags" className="post-header--icon" />
                  <h5 className="post-header--meta">{tag}</h5>
                </div>
              </div>
              <div className="post-header--column">
                <div className="post-header--item">
                  <Icon type="user" className="post-header--icon" />
                  <h5 className="post-header--meta">{organisation_name}</h5>
                </div>
                <div className="post-header--item">
                  <Icon type="form" className="post-header--icon" />
                  <h5 className="post-header--meta">Public Service</h5>
                </div>
              </div>
                <div className="post-header--column">
                  <div className="post-header--item">
                    <Icon type="eye" className="post-header--icon" />
                    <h5 className="post-header--meta">1000 views</h5>
                  </div>
                  <div className="post-header--item">
                    <Icon type="pushpin" className="post-header--icon" />
                    <h5 className="post-header--meta">1000 clicks</h5>
                  </div>
                </div>
            </div>
            <div className="public-service--content">
              {pargraphs.map((paragraph, index) => {
                return (
                  <p key={index} className="public-service--paragraph">
                    {paragraph}
                  </p>
                );
              })}
            </div>
            <div className="public-service--tags-container">
              <h3 className="public-service--label">Tags</h3>
              <div className="public-service--tags">
                <span className="public-service--tag">{tag}</span>
                {secondary_tag.map((tag, index) => (
                  <span key={index} className="public-service--tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <Button
              onClick={() => this.props.history.push("/posts")}
              className="public-service-btn--back"
            >
              Back
            </Button>
          </>
        )}
      </section>
    );
  }
}
