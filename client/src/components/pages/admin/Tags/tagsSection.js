import React from "react";
import { Tag, Input, Icon, notification } from "antd";
import { TweenOneGroup } from "rc-tween-one";
import axios from "axios";

export default class addTagSection extends React.Component {
  state = { inputVisible: false };

  handleDeleteTag = async removedTag => {
    try {
      const { axiosRoute } = this.props;
      const tags = this.props.tags.filter(tag => tag !== removedTag);
      await axios.delete(`/api/v1/post${axiosRoute}`, {
        data: { tag: removedTag }
      });
      await this.props.handleUpdateTags(tags);

      notification.success({
        message: this.props.deleteSucessMessage,
        placement: "bottomRight"
      });
    } catch (err) {
      notification.error({
        message: "Sorry There is an error, try again later"
      });
    }
  };

  showInput = () => this.setState({ inputVisible: true });

  hideInput = () => this.setState({ inputVisible: false });

  handleInputConfirm = async () => {
    try {
      const inputValue = this.newTagInput.input.value;
      const { axiosRoute } = this.props;
      await axios.post(`/api/v1/post${axiosRoute}`, {
        tag: inputValue
      });

      let { tags, handleUpdateTags } = this.props;
      handleUpdateTags([...tags, inputValue]);

      this.setState({ inputVisible: false });

      notification.success({
        message: this.props.addSuccessMessage,
        placement: "bottomRight"
      });
    } catch (e) {
      notification.error({
        message: "Sorry There is an error, try again"
      });
    }
  };

  createInputRef = input => (this.newTagInput = input);

  render() {
    const { inputVisible } = this.state;
    const tags = this.props.tags.map(tag => (
      <span key={tag} style={{ display: "inline-block" }}>
        <Tag closable onClose={() => this.handleDeleteTag(tag)}>
          {tag}
        </Tag>
      </span>
    ));

    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <TweenOneGroup
            enter={{
              scale: 0.8,
              opacity: 0,
              type: "from",
              duration: 100,
              onComplete: e => {
                e.target.style = "";
              }
            }}
            leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
            appear={false}
          >
            {tags}
          </TweenOneGroup>
        </div>
        {inputVisible ? (
          <Input
            ref={this.createInputRef}
            type="text"
            size="small"
            style={{ width: 220, height: 25 }}
            onBlur={this.hideInput}
            onPressEnter={this.handleInputConfirm}
            autoFocus
          />
        ) : (
          <Tag className="newTagButton" onClick={this.showInput}>
            <Icon type="plus" /> {this.props.addNewMessage}
          </Tag>
        )}
      </div>
    );
  }
}
