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
import { ResultEnum } from '@/enums';

import { FormButtonContainer, FormColContainer, FormItemContainer, FormRowContainer } from './components';
import type { FormConfig } from './interface';

export function useForm<T = unknown>(formConfig: FormConfig): [() => JSX.Element, FormInstance<T>] {
  // export function useForm(formConfig: FormConfig): [() => JSX.Element, FormInstance] {
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

    // const { field, depend, condition } = watch!;
    // const d = Form.useWatch(depend, formInstance as unknown as FormInstance);

    return (
      <Form form={formInstance as unknown as FormInstance} {...formProps} className='use-form-container'>
        <FormRowContainer isInLine={isInLine}>
          {formItems.map((item) => {
            const { formItemProps, componentProps, component, watch } = item;
            // const { field } = watch;

            // if (field === formItemProps.field && d && !condition(d)) {
            //   return null;
            // }

            return (
              // TODO: FormItem必须直接包裹在表单控件外，并且表单控件是 FormItem 的唯一子节点
              <FormColContainer isInLine={isInLine} baseColWidth={baseColWidth} key={formItemProps.field as string}>
                <FormItemContainer
                  needUpdate={watch?.field ? watch?.field === formItemProps.field : false}
                  watch={watch}
                >
                  <>
                    {component === 'input' && (
                      <FormItem {...formItemProps}>
                        <Input {...(componentProps as InputProps)} />
                      </FormItem>
                    )}
                    {/* {component === 'group' && (
                      <FormItem {...formItemProps}>
                        <Input.Group compact>
                          {childrenItems?.map((childItem) => {
                            return (
                              <FormItem {...childItem.formItemProps}>
                                <Input {...(childItem.componentProps as InputProps)} />
                              </FormItem>
                            );
                          })}
                        </Input.Group>
                      </FormItem>
                    )} */}
                    {component === 'inputNumber' && (
                      <FormItem {...formItemProps}>
                        <InputNumber {...(componentProps as InputNumberProps)} />
                      </FormItem>
                    )}
                    {component === 'textarea' && (
                      <FormItem {...formItemProps}>
                        <TextArea {...(componentProps as TextAreaProps)} />
                      </FormItem>
                    )}
                    {component === 'switch' && (
                      <FormItem {...formItemProps}>
                        <Switch
                          {...(componentProps as SwitchProps)}
                          checkedIcon={<div className='i-material-symbols:check'></div>}
                        />
                      </FormItem>
                    )}
                    {component === 'radio' && (
                      <FormItem {...formItemProps}>
                        <RadioGroup {...(componentProps as RadioGroupProps)} />
                      </FormItem>
                    )}
                    {component === 'checkbox' && (
                      <FormItem {...formItemProps}>
                        <CheckboxGroup {...(componentProps as CheckboxGroupProps<string>)} />
                      </FormItem>
                    )}
                    {component === 'datePicker' && (
                      <FormItem {...formItemProps}>
                        <DatePicker {...(componentProps as DatePickerProps)} />
                      </FormItem>
                    )}
                    {component === 'uploadPhoto' && (
                      <FormItem {...formItemProps}>
                        <Upload
                          {...(componentProps as UploadProps)}
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

                              if (code === ResultEnum.SUCCESS) {
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
                </FormItemContainer>
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
