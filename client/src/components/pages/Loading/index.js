import React from "react";
import { Spin,Icon } from "antd";

import "./index.css";

export default function index() {
  return (
    <div className="loading-page-container">
      <Spin
        className="event-spin"
        tip="Loading..."
        size="large"
        indicator={<Icon type="loading" style={{ fontSize: 50 }} spin />}
      />
    </div>
  );
}
