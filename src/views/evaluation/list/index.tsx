import './index.scss';

import {
  Button,
  Card,
  Form,
  FormInstance,
  Grid,
  Input,
  InputNumber,
  Message,
  Modal,
  PageHeader,
  Popconfirm,
  Radio,
  Table,
  type TableColumnProps,
  Tooltip,
} from '@arco-design/web-react';

import { evaluation } from '@/api';
import type { Evaluation } from '@/api/evaluation/interface';
import { ResultEnum } from '@/enums/http';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Row = Grid.Row;
const Col = Grid.Col;

const EvaluationList = () => {
  const columns: TableColumnProps<Evaluation>[] = [
    {
      title: 'ID',
      width: 180,
      dataIndex: 'id',
      sorter: {
        compare: (a: Evaluation, b: Evaluation) => a.id - b.id,
        // multiple: 2,
      },
    },
    {
      title: '名称',
      width: 240,
      dataIndex: 'name',
      // sorter: {
      // compare: (a: Evaluation, b: Evaluation) => a.name - b.name,
      // multiple: 2,
      // },
    },
    {
      title: '说明',
      width: 240,
      dataIndex: 'remark',
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
      render: (_, item) => (
        <Row gutter={6}>
          <Col span={6}>
            <Tooltip content='编辑'>
              <Button
                type='primary'
                shape='circle'
                icon={<div className='r-ph-anchor-simple-thin' />}
                onClick={() => handleOpenModal(2, item)}
              ></Button>
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
            <Popconfirm
              focusLock
              title='警告'
              content='请确认是否删除?'
              onOk={() => handleDelete(item)}
              onCancel={() => {
                Message.error({
                  content: 'cancel',
                });
              }}
            >
              <Tooltip content='删除'>
                <Button
                  type='primary'
                  shape='circle'
                  status='danger'
                  icon={<div className='r-ph-anchor-simple-thin' />}
                ></Button>
              </Tooltip>
            </Popconfirm>
          </Col>
        </Row>
      ),
    },
  ];

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<Evaluation[]>([]);

  useEffect(() => {
    void fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);

    const params = {
      page: 1,
      limit: 10,
    };

    try {
      const { code, result } = await evaluation.getEvaluationList(params);

      if (code === ResultEnum.SUCCESS) {
        setList(result.list);
        setLoading(false);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const searchFormRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const formRef = useRef<FormInstance<Evaluation>>(null);
  const [currentItem, setCurrentItem] = useState<Evaluation | null>(null);
  const [mode, setMode] = useState(1);

  const handleOpenModal = (mode: number, data?: Evaluation) => {
    setVisible(true);
    setMode(mode);

    if (data) {
      setCurrentItem(data);
      formRef.current?.setFieldsValue(data);
    }
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleCreateOrUpdate = async () => {
    if (formRef.current) {
      try {
        const res = await formRef.current.validate();

        await fetchOperate(mode, res);
      } catch (_) {
        console.log(formRef.current.getFieldsError());
        // Message.error('校验失败，请检查字段！');
      }
    }
  };

  const handleDelete = async (data: Evaluation) => {
    setCurrentItem(data);

    await fetchOperate(3, data);
  };

  const fetchOperate = async (mode: number, data: Evaluation) => {
    const params = {
      ...data,
      id: currentItem?.id ?? data.id,
    };

    let api,
      msg = '';

    switch (mode) {
      case 1:
        api = evaluation.createEvaluation;
        msg = '新增成功';
        break;
      case 2:
        api = evaluation.updateEvaluation;
        msg = '更新成功';
        break;
      case 3:
        api = evaluation.deleteEvaluation;
        msg = '删除成功';
        break;
      default:
        api = evaluation.createEvaluation;
        break;
    }

    try {
      const { code } = await api(params);

      if (code === ResultEnum.SUCCESS) {
        await fetchData();

        handleCloseModal();

        formRef?.current?.clearFields();

        Message.success(msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className='container'>
      <PageHeader
        title='评测列表'
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
          ],
        }}
      />
      <Card>
        <Form
          ref={searchFormRef}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          autoComplete='off'
          layout='inline'
          size='large'
        >
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
          title='评测列表'
          bordered={false}
          headerStyle={{ textAlign: 'left' }}
          extra={
            <Button
              type='primary'
              htmlType='button'
              icon={<div className='r-ph-anchor-simple-thin' />}
              style={{ width: '100%' }}
              onClick={() => handleOpenModal(1)}
            >
              新增
            </Button>
          }
        >
          <Table
            // tableLayoutFixed
            columns={columns}
            data={list}
            loading={loading}
            scroll={{ x: true }}
            border={{ bodyCell: false }}
            pagination={{ total: 50, showTotal: true, showJumper: true, sizeCanChange: true }}
            pagePosition='bottomCenter'
            rowKey='id'
          />
        </Card>
      </section>
      <Modal
        title={(mode === 1 ? '新增' : '编辑') + '评测'}
        visible={visible}
        onOk={handleCreateOrUpdate}
        onCancel={handleCloseModal}
        autoFocus={false}
        focusLock={true}
        mountOnEnter={false}
      >
        <Form ref={formRef} autoComplete='off' scrollToFirstError>
          <FormItem label='评测名称' field='name' rules={[{ required: true }]}>
            <Input placeholder='please enter...' />
          </FormItem>
          <FormItem label='说明' field='describe'>
            <Input placeholder='please enter...' />
          </FormItem>
          <FormItem label='备注' field='remark'>
            <Input placeholder='please enter...' />
          </FormItem>
        </Form>
      </Modal>
    </section>
  );
};

export default EvaluationList;
