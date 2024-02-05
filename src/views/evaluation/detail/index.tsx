import './index.scss';

import {
  Button,
  Card,
  Form,
  Grid,
  Input,
  Modal,
  PageHeader,
  Radio,
  Table,
  type TableColumnProps,
} from '@arco-design/web-react';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Row = Grid.Row;
const Col = Grid.Col;

const columns: TableColumnProps[] = [
  {
    title: '姓名',
    width: 140,
    dataIndex: 'name',
  },
  {
    title: '性别',
    width: 120,
    dataIndex: 'gender',
  },
  {
    title: '手机号',
    width: 140,
    dataIndex: 'mobile',
  },
  {
    title: '年龄',
    width: 140,
    dataIndex: 'age',
  },
  {
    title: '备注',
    width: 240,
    dataIndex: 'mark',
  },
  {
    title: '操作',
    width: 320,
    fixed: 'right',
    dataIndex: 'operation',
    render: () => (
      <Row gutter={10}>
        <Col span={6}>
          <Button type='primary'>编辑</Button>
        </Col>
        <Col span={6}>
          <Button type='primary'>详情</Button>
        </Col>
        <Col span={6}>
          <Button type='primary'>记录</Button>
        </Col>
        <Col span={6}>
          <Button type='primary' status='danger'>
            删除
          </Button>
        </Col>
      </Row>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'Jane Doe',
    gender: 23000,
    mobile: '32 Park Road, London',
    age: 'jane.doe@example.com',
  },
  {
    key: '2',
    name: 'Alisa Ross',
    salary: 25000,
    address: '35 Park Road, London',
    email: 'alisa.ross@example.com',
  },
  {
    key: '3',
    name: 'Kevin Sandra',
    salary: 22000,
    address: '31 Park Road, London',
    email: 'kevin.sandra@example.com',
  },
  {
    key: '4',
    name: 'Ed Hellen',
    salary: 17000,
    address: '42 Park Road, London',
    email: 'ed.hellen@example.com',
  },
  {
    key: '5',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com',
  },
];

const UserList = () => {
  // const [layout, setLayout] = useState('horizontal');
  const [visible, setVisible] = useState(false);

  return (
    <section className='container'>
      <PageHeader
        title='用户列表'
        breadcrumb={{
          routes: [
            {
              path: '/',
              breadcrumbName: 'Home',
            },
            {
              path: '/channel',
              breadcrumbName: 'Channel',
            },
            {
              path: '/news',
              breadcrumbName: 'News',
            },
          ],
        }}
      />
      <Card
        actions={[
          <Button style={{ width: '100%' }} key='reset' htmlType='reset'>
            重置
          </Button>,
          <Button style={{ width: '100%' }} key='search' type='primary' htmlType='button'>
            查询
          </Button>,
        ]}
      >
        <Form autoComplete='off' layout='inline' size='large' labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
          <FormItem label='用户名' field='username'>
            <Input placeholder='请输入用户名' />
          </FormItem>
          <FormItem label='手机号' field='mobile'>
            <Input placeholder='请输入手机号' type='number' />
          </FormItem>
          <FormItem label='年龄' field='age'>
            <Input placeholder='请输入手机号' type='number' />
          </FormItem>
          <FormItem label='性别' field='gender'>
            <RadioGroup defaultValue='1'>
              <Radio value='1'>男</Radio>
              <Radio value='2'>女</Radio>
            </RadioGroup>
          </FormItem>
        </Form>
      </Card>
      <section className='mt-4'>
        <Card
          title='用户列表'
          bordered={false}
          headerStyle={{ textAlign: 'left' }}
          extra={
            <Button style={{ width: '100%' }} type='primary' htmlType='button' onClick={() => setVisible(true)}>
              新建
            </Button>
          }
        >
          <Table
            columns={columns}
            data={data}
            loading={false}
            scroll={{ x: true }}
            border={{ bodyCell: false }}
            pagination={{ total: 50, showTotal: true, showJumper: true, sizeCanChange: true }}
            pagePosition='bottomCenter'
          />
        </Card>
      </section>
      <Modal
        title='Modal Title'
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        autoFocus={false}
        focusLock={true}
      >
        <p>
          You can customize modal body text by the current situation. This modal will be closed immediately once you
          press the OK button.
        </p>
      </Modal>
    </section>
  );
};

export default UserList;
