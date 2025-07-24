// FormRow.tsx
import React from "react";
import type { RowProps } from "antd";

import MyFormItem, {
  type MyFormItemProps,
  type InnerProps,
} from "../form-item";

interface FormRowProps {
  fields: MyFormItemProps<keyof InnerProps>[];
  colProps?: { span: number; offset?: number }[];
  rowProps?: RowProps;
}

const FormRow: React.FC<FormRowProps> = ({ fields, colProps, rowProps }) => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-4">
      {fields.map((field, index) => (
        <div
          key={field.name?.toString() || index}
          className="flex-1 min-w-[200px]"
        >
          <MyFormItem {...field} />
        </div>
      ))}
    </div>
  );
};

export default FormRow;
