/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Form, Grid } from '@arco-design/web-react';
import type { ReactElement } from 'react';

import type { WatchConfig } from './interface';

export const FormRowContainer = ({ isInLine, children }: { isInLine: boolean; children: unknown }) => {
  const Row = Grid.Row;

  if (isInLine) {
    return <Row style={{ width: '100%' }}>{children as ReactElement}</Row>;
  } else {
    return <>{children}</>;
  }
};

export const FormColContainer = ({
  isInLine,
  baseColWidth,
  children,
}: {
  isInLine: boolean;
  baseColWidth: number;
  children: React.ReactElement;
}) => {
  const Col = Grid.Col;

  if (isInLine) {
    return <Col span={baseColWidth}>{children}</Col>;
  } else {
    return <>{children}</>;
  }
};

export const FormItemContainer = ({
  watch,
  needUpdate,
  children,
}: {
  watch?: WatchConfig | undefined;
  needUpdate: boolean;
  children: React.ReactElement;
}) => {
  const FormItem = Form.Item;

  if (needUpdate) {
    return (
      <FormItem shouldUpdate noStyle>
        {(values) => (watch?.depend && watch?.condition?.(values[watch.depend]) ? children : null)}
      </FormItem>
    );
  } else {
    return <>{children}</>;
  }
};

export const FormButtonContainer = ({
  isInLine,
  baseColWidth,
  offsetWidth,
  children,
  // buttons,
}: {
  isInLine: boolean;
  baseColWidth?: number;
  offsetWidth?: number;
  children: React.ReactElement[] | React.ReactElement;

  // buttons?: FormButtonConfig[];
}) => {
  const FormItem = Form.Item;
  const Col = Grid.Col;

  // TODO:
  // const buts = buttons?.map((button) => {
  //   return (
  //     <Button key={button.type} {...button} className='ml-4'>
  //       {button.name}
  //     </Button>
  //   );
  // });

  if (isInLine) {
    return (
      <Col span={baseColWidth} offset={offsetWidth}>
        <div className='flex justify-end'>{children}</div>
      </Col>
    );
  } else {
    return <FormItem>{children}</FormItem>;
  }
};
