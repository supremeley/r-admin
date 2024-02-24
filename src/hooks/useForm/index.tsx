import './index.scss';

import type {
  CheckboxGroupProps,
  DatePickerProps,
  FormInstance,
  InputNumberProps,
  InputProps,
  RadioGroupProps,
  SwitchProps,
  TextAreaProps,
  UploadProps,
} from '@arco-design/web-react';
import { Button, Checkbox, DatePicker, Form, Input, InputNumber, Radio, Switch, Upload } from '@arco-design/web-react';
import { omit } from 'lodash-es';

import { file as fileUploadApi } from '@/api';

import { FormButtonContainer, FormColContainer, FormRowContainer } from './components';
import type { FormConfig } from './interface';

export function useForm<T = unknown>(formConfig: FormConfig): [() => JSX.Element, FormInstance<T>] {
  const FormItem = Form.Item;
  const TextArea = Input.TextArea;
  const RadioGroup = Radio.Group;
  const CheckboxGroup = Checkbox.Group;

  const [formInstance] = Form.useForm<T>();

  const formProps = omit<FormConfig>(formConfig, ['formItems', 'formButtons']);

  const baseColNum = 3;

  const baseColWidth = 24 / baseColNum;

  const CombineForm = () => {
    const isInLine = formConfig.layout === 'inline';
    const { formItems = [], formButtons = [] } = formConfig;
    let offsetMultiple = 0;

    if (formItems?.length && formButtons?.length) {
      offsetMultiple = formItems.length % baseColNum;
    }

    return (
      <Form form={formInstance as unknown as FormInstance} {...formProps} className='use-form-container'>
        <FormRowContainer isInLine={isInLine}>
          {formItems.map((item) => {
            const formItemProps = omit(item, [
              'allowClear',
              'span',
              'formItemType',
              'autoSize',
              'defaultValue',
              'listType',
            ]);
            const inputProps = omit(item, [
              'allowClear',
              'span',
              'formItemType',
              'initialValue',
              'field',
              'triggerPropName',
            ]);

            return (
              // TODO: FormItem必须直接包裹在表单控件外，并且表单控件是 FormItem 的唯一子节点
              <FormColContainer isInLine={isInLine} baseColWidth={baseColWidth} key={item.field as string}>
                <>
                  {item.formItemType === 'input' && (
                    <FormItem {...formItemProps}>
                      <Input {...(inputProps as InputProps)} />
                    </FormItem>
                  )}
                  {item.formItemType === 'inputNumber' && (
                    <FormItem {...formItemProps}>
                      <InputNumber {...(inputProps as InputNumberProps)} />
                    </FormItem>
                  )}
                  {item.formItemType === 'textarea' && (
                    <FormItem {...formItemProps}>
                      <TextArea {...(inputProps as TextAreaProps)} />
                    </FormItem>
                  )}
                  {item.formItemType === 'switch' && (
                    <FormItem {...formItemProps}>
                      <Switch
                        {...(inputProps as SwitchProps)}
                        checkedIcon={<div className='r-material-symbols:check'></div>}
                      />
                    </FormItem>
                  )}
                  {item.formItemType === 'radio' && (
                    <FormItem {...formItemProps}>
                      <RadioGroup {...(inputProps as RadioGroupProps)} />
                    </FormItem>
                  )}
                  {item.formItemType === 'checkbox' && (
                    <FormItem {...formItemProps}>
                      <CheckboxGroup {...(inputProps as CheckboxGroupProps<string>)} />
                    </FormItem>
                  )}
                  {item.formItemType === 'datePicker' && (
                    <FormItem {...formItemProps}>
                      <DatePicker {...(inputProps as DatePickerProps)} />
                    </FormItem>
                  )}
                  {item.formItemType === 'uploadPhoto' && (
                    <FormItem {...formItemProps}>
                      <Upload
                        {...(inputProps as UploadProps)}
                        customRequest={async (option) => {
                          const { onProgress, onError, onSuccess, file } = option;

                          try {
                            const { code, result } = await fileUploadApi.fileUpload({ file }, (event) => {
                              if (event.total) {
                                let percent;
                                if (event.total > 0) {
                                  percent = (event.loaded / event.total) * 100;
                                }

                                onProgress(parseInt(String(percent), 10));
                              }
                            });

                            if (code === 200) {
                              onSuccess(result);
                            } else {
                              onError();
                            }
                          } catch (e) {
                            onError(e as object);
                          }
                        }}
                      ></Upload>
                    </FormItem>
                  )}
                </>
              </FormColContainer>
            );
          })}
          {formButtons.length ? (
            <FormButtonContainer
              isInLine={isInLine}
              baseColWidth={baseColWidth}
              offsetWidth={(baseColNum - offsetMultiple - 1) * baseColWidth}
              key='button-container'
            >
              {formButtons.map((button) => {
                return (
                  <Button key={button.name} {...button} className='ml-4'>
                    {button.name}
                  </Button>
                );
              })}
            </FormButtonContainer>
          ) : null}
        </FormRowContainer>
      </Form>
    );
  };

  return [CombineForm, formInstance];
}
