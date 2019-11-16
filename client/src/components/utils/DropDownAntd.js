import React from "react";
import { Form, Select } from "antd";

const { Option } = Select;
const { Item } = Form;

const DropDownAntd = ({
  label,
  getFieldDecorator,
  name,
  required,
  validationMsg,
  placeholder,
  handleSelectChange,
  optionsMenu,
  mode = null
}) => (
  <Item label={label}>
    {getFieldDecorator(name, {
      rules: [{ required: required, message: validationMsg }]
    })(
      <Select
        mode={mode}
        size="large"
        placeholder={placeholder}
        onChange={handleSelectChange}
      >
        {optionsMenu.map(({ id, value }) => (
          <Option key={id} value={id}>
            {value}
          </Option>
        ))}
      </Select>
    )}
  </Item>
);

export default DropDownAntd;
