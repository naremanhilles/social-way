import React, { Component } from "react";
import PropTypes from "prop-types";

import "./style.css";

export default class HamburgerButton extends Component {
  render() {
    const { toggled = false, className = "" } = this.props;
    return (
      <div
        className={`hamburger-container ${className} ${
          toggled ? "hamburger-container-change" : ""
        }`}
        onClick={this.props.handleMenuToggle}
      >
        {[1, 2, 3].map(value => (
          <div
            key={value}
            className={`hamburger-container--bar hamburger-container--bar${value}`}
          />
        ))}
      </div>
    );
  }
}

HamburgerButton.propTypes = {
  handleMenuToggle: PropTypes.func.isRequired,
  toggled: PropTypes.bool.isRequired,
  className: PropTypes.string
};
