import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { notification } from "antd";

import "./style.css";

export default class ProfilePic extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = { imgSrc: this.props.imgSrc || "" };
  }

  handleFileInput = async () => {
    const formData = new FormData();
    const file = this.fileInput.current.files[0];
    formData.append("image", file);

    axios
      .post("/api/v1/user/edit-pic", formData)
      .then(res => this.setState({ imgSrc: res.data.data.imgSrc }))
      .catch(e => {
        if (e.response) {
          notification.error({
            message: "Error",
            description: e.data.error
          });
        } else {
          notification.error({
            message: "Error",
            description: "Something went wrong please try again later"
          });
        }
      });
  };

  render() {
    const { className = "" } = this.props;
    const { imgSrc } = this.state;

    return (
      <div className={`profile-pic ${className}`}>
        <img
          src={`/${imgSrc}`}
          alt="Profile Avatar"
          className="profile-pic--img"
        />
        <span
          className="profile-pic--edit-label"
          onClick={() => this.fileInput.current.click()}
        >
          Edit Picture
        </span>
        <input
          ref={this.fileInput}
          onChange={this.handleFileInput}
          type="file"
          accept="image/*"
          name="avatar"
          className="profile-pic--edit-input"
        />
      </div>
    );
  }
}

ProfilePic.propTypes = {
  className: PropTypes.string,
  imgSrc: PropTypes.string
};
