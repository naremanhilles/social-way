import React from "react";

import { Anchor } from "components/utils";
import "./style.css";

export default () => {
  const socialLinks = [
    { link: "https://www.facebook.com/romanroadldn", iconName: "facebook" },
    {
      link: "https://www.instagram.com/romanroadldn",
      iconName: "instagram"
    },
    { link: "https://www.twitter.com/romanroadldn", iconName: "twitter" },
    { link: "https://www.linkedin.com/showcase/roman-road-london/", iconName: "linkedin" }
  ];

  return <footer>{<Anchor socialLinks={socialLinks} />}</footer>;
};
