import './index.scss';

import {
  Button,
  Card,
  Form,
  Grid,
  Input,
  InputNumber,
  Modal,
  PageHeader,
  Radio,
  Table,
  type TableColumnProps,
  Tooltip,
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
    sorter: {
      compare: (a, b) => a.username - b.username,
      multiple: 2,
    },
  },
  {
    title: '性别',
    width: 120,
    dataIndex: 'gender',
    sorter: (a, b) => a.gender - b.gender,
  },
  {
    title: '手机号',
    width: 140,
    dataIndex: 'mobile',
    sorter: (a, b) => a.mobile - b.mobile,
  },
  {
    title: '年龄',
    width: 140,
    dataIndex: 'age',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: '备注',
    width: 240,
    dataIndex: 'mark',
  },
  {
    title: '操作',
    width: 200,
    fixed: 'right',
    dataIndex: 'operation',
    render: () => (
      <Row gutter={6}>
        <Col span={6}>
          <Tooltip content='编辑'>
            <Button type='primary' shape='circle' icon={<div className='r-ph-anchor-simple-thin' />}></Button>
          </Tooltip>
        </Col>
        <Col span={6}>
          <Tooltip content='详情'>
            <Button type='primary' shape='circle' icon={<div className='r-ph-anchor-simple-thin' />}></Button>
          </Tooltip>
        </Col>
        <Col span={6}>
          <Tooltip content='记录'>
            <Button type='primary' shape='circle' icon={<div className='r-ph-anchor-simple-thin' />}></Button>
          </Tooltip>
        </Col>
        <Col span={6}>
          <Tooltip content='删除'>
            <Button
              type='primary'
              shape='circle'
              status='danger'
              icon={<div className='r-ph-anchor-simple-thin' />}
            ></Button>
          </Tooltip>
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
];

const UserList = () => {
  const [visible, setVisible] = useState(false);
  const formRef = useRef({
    username: '',
    age: '',
    mobile: '',
    gender: 1,
    descript: '',
  });

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
      <Card>
        <Form autoComplete='off' layout='inline' size='large' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Row style={{ width: '100%' }}>
            <Col span={8}>
              <FormItem label='用户名' field='username'>
                <Input placeholder='请输入用户名' />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label='手机号' field='mobile'>
                <InputNumber placeholder='请输入手机号' />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label='年龄' field='age'>
                <InputNumber placeholder='请输入年龄' />
              </FormItem>
            </Col>
          </Row>
          <Row style={{ width: '100%' }}>
            <Col span={8}>
              <FormItem label='性别' field='gender'>
                <RadioGroup defaultValue='1'>
                  <Radio value='1'>男</Radio>
                  <Radio value='2'>女</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span={8} offset={8}>
              <div className='button-container'>
                <Button key='reset' htmlType='reset' icon={<div className='r-ph-anchor-simple-thin' />}>
                  重置
                </Button>
                <Button
                  key='search'
                  type='primary'
                  htmlType='button'
                  icon={<div className='r-ph-anchor-simple-thin' />}
                >
                  查询
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Card>
      <section className='mt-4'>
        <Card
          title='用户列表'
          bordered={false}
          headerStyle={{ textAlign: 'left' }}
          extra={
            <Button
              type='primary'
              htmlType='button'
              icon={<div className='r-ph-anchor-simple-thin' />}
              style={{ width: '100%' }}
              onClick={() => setVisible(true)}
            >
              新建
            </Button>
          }
        >
          <Table
            // tableLayoutFixed
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
        title='新增用户'
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        autoFocus={false}
        focusLock={true}
      >
        <Form
          ref={formRef}
          autoComplete='off'
          // initialValues={{
          //   slider: 20,
          // }}
          scrollToFirstError
        >
          <FormItem label='用户名' field='username' rules={[{ required: true }]}>
            <Input placeholder='please enter...' />
          </FormItem>
          <FormItem label='手机号' field='name' rules={[{ type: 'number', required: true }]}>
            <InputNumber placeholder='please enter...' />
          </FormItem>
          <FormItem label='年龄' field='age' rules={[{ type: 'number', required: true }]}>
            <InputNumber placeholder='please enter...' />
          </FormItem>
          <FormItem label='性别' field='gender'>
            <Radio.Group defaultValue='1'>
              <Radio value='1'>男</Radio>
              <Radio value='2'>女</Radio>
            </Radio.Group>
          </FormItem>
          <FormItem label='备注' field='remark'>
            <Input placeholder='please enter...' />
          </FormItem>
        </Form>
      </Modal>
    </section>
  );
};

export default UserList;
