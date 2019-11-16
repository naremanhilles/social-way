import React, { Component } from "react";
import axios from "axios";
import { notification } from "antd";

import PostButton from "components/utils/PostButton";
import PostRow from "components/utils/PostRow";
import "./style.css";
export default class Post extends Component {
  state = {
    posts: [],
    notification: ""
  };

  componentDidMount() {
    const { postType } = this.props;
    axios
      .get(`/api/v1/post/${postType}`)
      .then(({ data: { data } }) => {
        if (!data.length)
          return this.setState({
            notification: `No ${postType} Posts Available`
          });
        this.setState({ posts: data });
      })
      .catch(err => {
        const { statusCode, error } = err.response.data;
        const objError = { message: "ERROR", description: error };
        statusCode
          ? notification.error(objError)
          : notification.error({ message: 'ERROR', description: 'Sorry, there is error' })
        if (statusCode === 401) this.props.handleUnauth();
      })
  }

  handleDelete = (id, type) => {
    const { posts } = this.state;
    axios
      .delete(`/api/v1/post/${id}`, { data: { type } })
      .then(({ data: { data } }) => {
        if (data.id === id) {
          this.setState(
            { posts: posts.filter(post => post.id !== Number(id)) },
            () => {
              notification.success({
                message: "Success",
                description: "Deleted Successfully"
              });
            }
          );
        }
      })
      .catch(err => {
        const { statusCode, error } = err.response.data;
        const objError = { message: "ERROR", description: error };
        statusCode
          ? notification.error(objError)
          : notification.error({ message: 'ERROR', description: 'Sorry, there is error' });

        if (statusCode === 401) this.props.handleUnauth();
      })
  }

  render() {
    const { postType } = this.props;
    const { posts, notification } = this.state;
    return (
      <section className="post-page--main">
        <PostButton postType={`${postType} Posts`} />
        <span className='post-page--error'>{notification}</span>
        {posts.map(post => <PostRow
          link={post.type === 'event'
            ?
            post.category.toLowerCase().replace(' and ', '-')
            :
            post.tag.toLowerCase().replace(' and ', '-')
          }
          {...post}
          key={post.id + post.type}
          onClick={this.handleDelete}
        />
        )
        }
      </section >
    )
  }
}
