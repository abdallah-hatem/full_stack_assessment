import { Form, type FormProps } from "antd";
import MyFormItem, {
  type ControlTypes,
  type InnerProps,
  type MyFormItemProps,
} from "./form-item";
import type { ReactNode } from "react";
import FormRow from "./form-row";
import ButtonComp from "../functional/buttonComp";
import "./styles.css";

// Define type for a row of form items
export type FormItemRow = MyFormItemProps<keyof InnerProps>[];

// Define type for all form items (can be a single row or multiple rows)
export type formFieldsType = Array<
  FormItemRow | MyFormItemProps<keyof InnerProps>
>;

export interface MyFormProps<T> extends FormProps<T> {
  fileds?: formFieldsType;
  showSubmit?: boolean;
  submitText?: string;
  submitStyleTw?: string;
  submitStyleContainerTw?: string;
  isTableForm?: boolean;
  onSumbit?: (data?: any) => void;
  children?: ReactNode;
  afterSubmit?: ReactNode;
  responsiveRows?: boolean;
  loadingButton?: boolean;
}

type _schemeType = {
  key?: string;
  label?: ReactNode;
  name?: string | any;
  type?: ControlTypes;
  options?: {
    label: string;
    value: any;
  }[];
  innerProps?: InnerProps[keyof InnerProps];
};

export type schemeType = _schemeType;

export default function FormComp<T>({
  fileds,
  showSubmit,
  submitText,
  submitStyleTw,
  submitStyleContainerTw,
  onSumbit,
  children,
  afterSubmit,
  responsiveRows = false,
  loadingButton,
  ...props
}: MyFormProps<T>) {
  return (
    <Form layout="vertical" {...props}>
      {fileds?.map((field, fieldIndex) => {
        // Handle array of form items (row)
        if (Array.isArray(field)) {
          if (responsiveRows) {
            return (
              <div key={fieldIndex} className="flex flex-wrap gap-x-5">
                {field.map((subField, subFieldIndex) => (
                  <MyFormItem
                    key={
                      subField.name?.toString() ||
                      `${fieldIndex}-${subFieldIndex}`
                    }
                    {...subField}
                  />
                ))}
              </div>
            );
          }
          // If not responsive, use FormRow
          return <FormRow key={fieldIndex} fields={field} />;
        }

        // Handle single form item
        const singleField = field as MyFormItemProps<keyof InnerProps>;
        return (
          <MyFormItem
            key={singleField.name?.toString() || fieldIndex}
            {...singleField}
          />
        );
      })}

      {children}

      {showSubmit && (
        <MyFormItem className={submitStyleContainerTw}>
          <ButtonComp
            type="submit"
            className={submitStyleTw}
            onClick={onSumbit}
            loading={loadingButton}
          >
            {submitText ?? "Submit"}
          </ButtonComp>
        </MyFormItem>
      )}

      {afterSubmit && afterSubmit}
    </Form>
  );
}
