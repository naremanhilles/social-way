import React, { Component } from "react";
import { Table, Input, Button, Icon } from "antd";
import Highlighter from "react-highlight-words";
import PropTypes from "prop-types";

import "./style.css";

export default class AccountsTable extends Component {
  state = {
    searchText: ""
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text && text.toString()}
      />
    )
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const { actionRender, data, pageSize = 5 } = this.props;

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        ...this.getColumnSearchProps("name")
      },
      {
        title: "Email",
        dataIndex: "email",
        ...this.getColumnSearchProps("email")
      },
      {
        title: "Business",
        dataIndex: "business_type",
        ...this.getColumnSearchProps("business_type")
      },
      {
        title: "Website",
        dataIndex: "website",
        ...this.getColumnSearchProps("website"),
        render: text => (
          <a
            href={text && (!text.indexOf("http") ? text : `http://${text}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="admin-page__link"
          >
            Website
          </a>
        )
      },
      {
        title: "Organisation",
        dataIndex: "organisation_name",
        ...this.getColumnSearchProps("organisation_name")
      },
      {
        title: "Address",
        dataIndex: "address",
        ...this.getColumnSearchProps("address")
      },
      {
        title: "Social Media",
        dataIndex: "social_media",
        render: links =>
          links &&
          links.map(({ type, href }) =>
            href ? (
              <a
                href={!href.indexOf("http") ? href : `http://${href}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon type={type} />
              </a>
            ) : null
          )
      }
    ];

    const actionColumn = {
      title: "Action",
      dataIndex: "action",
      render: actionRender
    };
    columns.push(actionColumn);

    return (
      <Table
        loading={this.props.loading}
        bordered
        columns={columns}
        rowKey={({ id }) => id}
        dataSource={data}
        pagination={{ pageSize }}
        style={{ padding: 5 }}
      />
    );
  }
}

AccountsTable.propTypes = {
  data: PropTypes.array.isRequired,
  actionRender: PropTypes.func.isRequired,
  pageSize: PropTypes.number
};
