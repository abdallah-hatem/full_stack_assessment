import type { FormItemProps } from "antd/es/form";
import type { FC, ReactNode } from "react";

import {
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Rate,
  Select,
  Switch,
  TreeSelect,
  Upload,
} from "antd";
import { useWatch } from "antd/es/form/Form";
import React, { useMemo } from "react";
import FormList from "../form-list";

export type ControlTypes =
  | "input"
  | "input-number"
  | "switch"
  | "date-picker"
  | "checkbox"
  | "radio"
  | "select"
  | "textarea"
  | "range-date-picker"
  | "colorPicker"
  | "rating"
  | "file"
  | "file-dragger"
  | "otp"
  | "form-list"
  | "mobile"
  | "editor"
  | "password";

type GetRCPropsType<T> = T extends (props: infer R) => any
  ? R
  : T extends React.ComponentClass<infer R>
  ? R
  : any;

export type InnerProps = {
  input: GetRCPropsType<typeof Input>;
  "input-number": GetRCPropsType<typeof InputNumber>;
  switch: GetRCPropsType<typeof Switch>;
  "date-picker": GetRCPropsType<typeof DatePicker>;
  checkbox: GetRCPropsType<typeof Checkbox>;
  radio: GetRCPropsType<typeof Radio>;
  select: GetRCPropsType<typeof Select>;
  textarea: GetRCPropsType<typeof Input.TextArea>;
  colorPicker: GetRCPropsType<typeof ColorPicker>;
  "range-date-picker": GetRCPropsType<typeof DatePicker>;
  "tree-select": GetRCPropsType<typeof TreeSelect>;
  rating: GetRCPropsType<typeof Rate>;
  file: GetRCPropsType<typeof Upload>;
  otp: GetRCPropsType<typeof Input.OTP>;
  "form-list": React.ComponentProps<typeof FormList>;
  password: GetRCPropsType<typeof Input.Password>;
};

type InnerPropsControlTypes = keyof InnerProps;

export interface MyFormItemProps<
  T extends InnerPropsControlTypes = InnerPropsControlTypes
> extends Omit<FormItemProps, "required"> {
  type?: T;
  name?: string | any;
  options?:
    | {
        label: string;
        value: any;
        disabled?: boolean;
      }[]
    | any;
  innerProps?: InnerProps[T];
  required?: string | boolean;
  dependencies?: string[];
  shouldShow?: (values: any) => boolean;
  customButton?: ReactNode;
  formListData?: (field: any) => any;
  childrenBelow?: ReactNode;
  uploadType?: string;
}

const { RangePicker } = DatePicker;

export class ControlMap {
  props: MyFormItemProps;

  constructor(props: MyFormItemProps) {
    this.props = props;
  }

  get innerProps() {
    return this.props.innerProps as object;
  }

  input() {
    return <Input {...this.innerProps} />;
  }

  password() {
    return <Input.Password {...this.innerProps} />;
  }

  "input-number"() {
    return (
      <InputNumber
        {...this.innerProps}
        type="number"
        changeOnWheel={false}
        controls={false}
      />
    );
  }

  switch() {
    return <Switch {...this.innerProps} />;
  }

  "date-picker"() {
    return <DatePicker {...this.innerProps} />;
  }

  "range-date-picker"() {
    return <RangePicker {...this.innerProps} />;
  }

  checkbox() {
    return <Checkbox.Group options={this.props.options} {...this.innerProps} />;
  }

  radio() {
    return <Radio.Group options={this.props.options} {...this.innerProps} />;
  }

  select() {
    return (
      <Select
        showSearch
        optionFilterProp="label"
        options={this.props.options}
        {...this.innerProps}
      />
    );
  }

  "tree-select"() {
    return <TreeSelect {...this.innerProps} />;
  }

  textarea() {
    return <Input.TextArea {...this.innerProps} />;
  }

  colorPicker() {
    return <ColorPicker {...this.innerProps} defaultValue="#1677ff" />;
  }

  rating() {
    return <Rate {...this.innerProps} />;
  }

  file() {
    return <Upload {...this.innerProps} />;
  }

  otp() {
    return <Input.OTP {...this.innerProps} />;
  }
}

const MyFormItem: FC<MyFormItemProps> = (props) => {
  const {
    type,
    required,
    rules: userRules,
    dependencies,
    shouldShow,
    customButton,
    formListData,
    innerProps,
    options,
    childrenBelow,
    uploadType,
    ...restProps
  } = props;

  const form = Form.useFormInstance();
  const dependentValues = useWatch(dependencies, form);

  const dependencyValuesObject = useMemo(() => {
    if (!dependencies) return {};

    return dependencies.reduce((acc, dep) => {
      acc[dep] = form.getFieldValue(dep);

      return acc;
    }, {} as Record<string, any>);
  }, [dependencies, dependentValues, form]);

  const rules = useMemo(() => {
    if (userRules) return userRules;

    if (required) {
      if (typeof required === "boolean") {
        return [
          {
            required: true,
            message: `Please input ${props.label}`,
          },
        ];
      } else if (typeof required === "string") {
        return [{ required: true, message: required }];
      }
    }
  }, [required, userRules, props.label]);

  const controlMap = new ControlMap(props);

  const renderFormControl = () => {
    switch (type) {
      case "form-list":
        // @ts-ignore
        return <FormList {...restProps} formListData={formListData!} />;
      default:
        return type ? controlMap[type]() : props.children;
    }
  };

  const renderFormItem = () => (
    <>
      <Form.Item {...restProps} rules={rules}>
        {renderFormControl()}
      </Form.Item>
      {childrenBelow && <div className="mt-1 mb-3">{childrenBelow}</div>}
    </>
  );

  if (customButton) {
    return (
      <div className="w-full">
        <div className="flex items-center gap-2">
          <Form.Item {...restProps} rules={rules}>
            {renderFormControl()}
          </Form.Item>
          {customButton}
        </div>
        {childrenBelow && <div className="mt-1 mb-3">{childrenBelow}</div>}
      </div>
    );
  }

  return shouldShow === undefined || shouldShow(dependencyValuesObject)
    ? renderFormItem()
    : null;
};

export default MyFormItem;
