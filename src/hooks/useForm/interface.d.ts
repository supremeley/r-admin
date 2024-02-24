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

export type FormItemConfig =
  | (FormItemProps & InputProps & { formItemType: 'input'; span?: number })
  | (FormItemProps & InputNumberProps & { formItemType: 'inputNumber'; span?: number })
  | (FormItemProps & TextAreaProps & { formItemType: 'textarea' })
  | (FormItemProps & SwitchProps & { formItemType: 'switch'; span?: number })
  | (FormItemProps & RadioGroupProps & { formItemType: 'radio'; span?: number })
  | (FormItemProps & CheckboxGroupProps<string | number> & { formItemType: 'checkbox'; span?: number })
  | (FormItemProps & DatePickerProps & { formItemType: 'datePicker'; span?: number })
  | (FormItemProps & UploadProps & { formItemType: 'uploadPhoto'; span?: number });

//     | 'inputNumber'
//     | 'select'
//     | 'datepicker'
//     | 'timepicker'
//     | 'switch'
//     | 'slider'
//     | 'rate'
//     | 'upload'
//     | 'cascader'
//     | 'treeSelect'
//     | 'transfer'
//     | 'textarea';
//   span?: number;
// });

export type FormButtonConfig = ButtonProps & {
  name: string;
};

export interface FormConfig extends FormProps {
  formItems: FormItemConfig[];
  formButtons?: FormButtonConfig[];
}
