import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";

const { Sider } = Layout;

export default ({ children, tab }) => (
  <Layout>
    <Sider
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0
      }}
    >
      <div className="logo">
        <h1
          style={{
            textAlign: "center",
            padding: "20px 0px",
            color: "white",
            fontFamily: "lato",
            fontSize: "20px"
          }}
        >
          RomanRoadLondon
        </h1>
      </div>

      <Menu theme="dark" mode="inline" defaultSelectedKeys={[tab]}>
        <Menu.Item key="1">
          <Icon type="user" />
          <span className="nav-text">Pending accounts</span>
          <Link to="/admin/pending-accounts" />
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="team" />
          <span className="nav-text">Accounts</span>
          <Link to="/admin/accounts" />
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="upload" />
          <span className="nav-text">Posts</span>
          <Link to="/admin/posts" />
        </Menu.Item>
        <Menu.Item key="4">
          <Icon type="cloud-o" />
          <span className="nav-text">SEO Tips</span>
          <Link to="/admin/seo-tips" />
        </Menu.Item>
        <Menu.Item key="5">
          <Icon type="cloud-o" />
          <span className="nav-text">Tags</span>
          <Link to="/admin/tags" />
        </Menu.Item>
        <Menu.Item key="">
          <Icon type="logout" />
          <span className="nav-text">Logout</span>
          <Link to="/logout" />
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout style={{ marginLeft: 200 }}>
      <div
        style={{
          padding: "24px 12px",
          background: "#fff"
        }}
      >
        {children}
      </div>
    </Layout>
  </Layout>
);
