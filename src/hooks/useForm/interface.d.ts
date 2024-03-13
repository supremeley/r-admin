import type {
  ButtonProps,
  CheckboxGroupProps,
  DatePickerProps,
  FormItemProps,
  FormProps,
  InputNumberProps,
  InputProps,
  RadioGroupProps,
  SwitchProps,
  TextAreaProps,
  UploadProps,
} from '@arco-design/web-react';

interface ComponentProps {
  input: InputProps;
  inputNumber: InputNumberProps;
  textarea: TextAreaProps;
  switch: SwitchProps;
  radio: RadioGroupProps;
  checkbox: CheckboxGroupProps<string | number>;
  datePicker: DatePickerProps;
  uploadPhoto: UploadProps;
}

export interface FormItemConfig {
  formItemProps: FormItemProps;
  component: keyof ComponentProps;
  componentProps?: ComponentProps[keyof ComponentProps];
  watch?: WatchConfig;
}
// TODO:
//     | 'timepicker'
//     | 'slider'
//     | 'rate'
//     | 'cascader'
//     | 'treeSelect'
//     | 'transfer'
//     | 'textarea';
//   span?: number;
// });

export type FormButtonConfig = ButtonProps & {
  name: string;
};

export interface WatchConfig {
  field: string;
  depend: string;
  condition: (p: unknown) => boolean;
}

export interface FormConfig extends FormProps {
  formItems: FormItemConfig[];
  formButtons?: FormButtonConfig[];
}
