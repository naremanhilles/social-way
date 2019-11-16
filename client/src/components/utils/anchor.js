import React from "react";
import { Icon } from "antd";

export default props =>
  props.socialLinks.map(href => (
    <a
      key={href.iconName}
      className="footer--a"
      target="_blank"
      rel="noopener noreferrer"
      href={href.link}
    >
      <Icon type={href.iconName} />
    </a>
  ));
