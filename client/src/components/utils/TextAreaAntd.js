import React from "react";
import { Form, Input, Tooltip, Icon } from "antd";

const { Item } = Form;
const { TextArea } = Input;

const TextAreaAntd = ({
  withTip,
  style,
  label,
  tipInfo,
  getFieldDecorator,
  name,
  validationMsg,
  placeholder,
  min,
  max
}) => (
  <Item
    label={
      <span style={style}>
        {label}&nbsp;
        {withTip && (
          <Tooltip title={tipInfo}>
            <Icon type="info-circle" />
          </Tooltip>
        )}
      </span>
    }
  >
    {getFieldDecorator(name, {
      rules: [
        {
          required: true,
          message: validationMsg,
          whitespace: true
        }
      ]
    })(
      <TextArea
        placeholder={placeholder}
        autosize={{ minRows: min, maxRows: max }}
      />
    )}
  </Item>
);

export default TextAreaAntd;
