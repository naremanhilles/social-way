import React, { Component } from "react";
import { Tabs, Icon, notification } from "antd";
import Spin from 'components/pages/Loading'
import PropTypes from "prop-types";
import axios from 'axios';

import PersonalInfoForm from "components/utils/ProfilePersonal";
import BusinessForm from "components/utils/businessForm";
import ProfilePic from "components/pages/member/Profile/ProfilePic";
import "./style.css";

const { TabPane } = Tabs;

export default class ProfilePage extends Component {
  state = {
    personal: {},
    business: {},
    avatar: '',
    className: "",
    current: '1',
  }

  componentDidMount() {
    axios.get(`/api/v1/user`)
      .then(({ data: { data } }) => {
        const {
          id,
          first_name: firstName,
          last_name: lastName,
          email,
          avatar,
          organisation_name: organization,
          business_type: businessType,
          website,
          twitter,
          facebook,
          instagram,
          zip_code: zipCode,
          city,
          country,
          address,
        } = data;

        this.setState({
          personal:
          {
            firstName,
            lastName,
            email,
            id,
          },
          business:
          {
            organization,
            businessType,
            website,
            city,
            address,
            country,
            zipCode,
            twitter,
            facebook,
            instagram,
          },
          avatar
        })
      })
      .catch(err => {
        const { statusCode, error } = err.response.data;
        if (statusCode) {
          notification.error({ message: 'ERROR', description: error });
        }
      });
  }

  handleGoBack = (data, e) => {
    e.preventDefault();
    this.setState({ current: '1', business: data });
  };

  handleTabClick = (e) => {
    this.setState({ current: e })
  }

  render() {
    const { personal, business, className, avatar } = this.state;
    return (
      <div className={className} >
        {!personal.id ?
          <Spin />
          :
          <>
            <ProfilePic {...this.props} imgSrc={avatar} className="profile-page--pic" />
            <Tabs onTabClick={this.handleTabClick} activeKey={this.state.current} animated={true} className="profile-page-tabs">
              <TabPane
                tab={
                  <span>
                    <Icon type="user" />
                    Personal Info
            </span>
                }
                key="1"
              >
                <PersonalInfoForm {...this.props} personal={personal} />
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <Icon type="project" />
                    Business
            </span>
                }
                key="2"
              >
                <BusinessForm handleGoBack={this.handleGoBack}{...this.props} business={business} />
              </TabPane>
            </Tabs>
          </>
        }
      </div>
    );
  }
}

ProfilePage.propTypes = {
  personal: PropTypes.object,
  business: PropTypes.object,
  className: PropTypes.string
};
