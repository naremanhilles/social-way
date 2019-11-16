import React from "react";
import { Form, Input, Tooltip, Icon } from "antd";

const { Item } = Form;

const InputAntd = ({
  withTip,
  label,
  tipInfo,
  getFieldDecorator,
  name,
  validationMsg,
  placeholder,
  validation = {}
}) => (
  <Item
    label={
      <span>
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
          whitespace: true,
        },
        validation
      ]
    })(<Input placeholder={placeholder} />)}
  </Item>
);

export default InputAntd;
