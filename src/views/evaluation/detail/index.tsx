import './index.scss';

import type { TableColumnProps } from '@arco-design/web-react';
import {
  Button,
  Card,
  Descriptions,
  Form,
  Grid,
  Input,
  InputNumber,
  Message,
  Modal,
  PageHeader,
  Popconfirm,
  Space,
  Switch,
  Table,
  Tooltip,
} from '@arco-design/web-react';
import type { DataType } from '@arco-design/web-react/es/Descriptions/interface';
import type { ReactNode } from 'react';

import { evaluation, topic } from '@/api';
import type { OperateTopicOption, Topic } from '@/api/topic/interface';
import { adminTypeMap, genderMap } from '@/constants';
import { ResultEnum, TopicType } from '@/enums';
import { useForm } from '@/hooks';
import type { FormConfig } from '@/hooks/useForm/interface';

const Row = Grid.Row;
const Col = Grid.Col;

type Desc = Record<
  string,
  {
    key?: React.Key | undefined;
    label?: ReactNode;
    value?: ReactNode;
    span?: number | undefined;
    transform?: (val: number) => string;
  }
>;

const detailDescMap: Desc = {
  id: { label: 'ID' },
  username: { label: '名称' },
  mobile: { label: '手机号' },
  gender: { label: '性别', transform: (val) => genderMap[val] },
  type: { label: '类型', transform: (val) => adminTypeMap[val] },
  status: { label: '状态', transform: (val) => (val ? '启用' : '禁用') },
  describe: { label: '说明', span: 4 },
  remark: { label: '备注', span: 4 },
  createTime: { label: '创建时间' },
  updateTime: { label: '更新时间' },
};

const EvaluationDetail = () => {
  const columns: TableColumnProps<Topic>[] = [
    {
      title: 'ID',
      width: 120,
      dataIndex: 'id',
      sorter: {
        compare: (a: Topic, b: Topic) => a.id - b.id,
      },
    },
    {
      title: '序号',
      width: 120,
      dataIndex: 'sortNo',
      sorter: {
        compare: (a: Topic, b: Topic) => a.id - b.id,
      },
    },
    {
      title: '名称',
      width: 240,
      dataIndex: 'name',
    },

    {
      title: '类型',
      width: 180,
      dataIndex: 'type',
      sorter: {
        compare: (a: Topic, b: Topic) => a.type - b.type,
      },
      render: (col) => (
        <>
          {col === TopicType.Radio && <div>单选</div>}
          {col === TopicType.Checkbox && <div>多选</div>}
          {col === TopicType.Input && <div>描述</div>}
        </>
      ),
    },
    {
      title: '状态',
      width: 120,
      dataIndex: 'status',
      sorter: {
        compare: (a: Topic) => (a.status ? 1 : -1),
      },
      render: (col, item) => (
        <Switch
          checked={col}
          checkedIcon={<div className='r-material-symbols:check'></div>}
          onChange={() => handleSwitchStatus(item)}
        />
      ),
    },
    {
      title: '说明',
      width: 240,
      dataIndex: 'describe',
    },
    {
      title: '备注',
      width: 240,
      dataIndex: 'remark',
    },
    {
      title: '操作',
      width: 120,
      fixed: 'right',
      dataIndex: 'operation',
      render: (_, item) => (
        <Row gutter={6}>
          <Col span={12}>
            <Tooltip content='编辑'>
              <Button
                type='primary'
                shape='circle'
                icon={<div className='r-ph-anchor-simple-thin' />}
                onClick={() => handleOpenModal(2, item)}
              ></Button>
            </Tooltip>
          </Col>
          <Col span={12}>
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

  const { id: evaluatinoId } = useParams();
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<Topic | null>(null);
  const [detailDesc, setDetailDesc] = useState<DataType>([]);
  const [list, setList] = useState<Topic[]>([]);

  useEffect(() => {
    // console.log('useEffect');
    void fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);

    const params = {
      id: Number(evaluatinoId!),
    };

    try {
      const { code, result } = await evaluation.getEvaluationDetail(params);

      if (code === ResultEnum.SUCCESS) {
        // const detailArr = [];
        // for (const [key, value] of Object.entries(result)) {
        //   detailArr.push({ value: detailDescMap[key].transform?.(value as number) ?? value, ...detailDescMap[key] });
        // }
        // setDetail(result);
        // setDetailDesc(detailArr);
        setLoading(false);
        setList(result.topicList || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [visible, setVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState<Topic | null>(null);
  const [mode, setMode] = useState(1);

  const editorFormConfig: FormConfig = {
    autoComplete: 'off',
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
    formItems: [
      {
        formItemType: 'input',
        label: '题目名称',
        field: 'name',
        placeholder: '请输入评测名称',
        rules: [{ required: true, message: '请输入题目名称' }],
      },
      {
        formItemType: 'radio',
        label: '题目类型',
        field: 'type',
        initialValue: 1,
        options: [
          { label: '单选题', value: 1 },
          { label: '多选题', value: 2 },
          { label: '描述题', value: 3 },
        ],
      },
      {
        formItemType: 'inputNumber',
        label: '题目序号',
        field: 'sortNo',
        placeholder: '请输入题目序号',
      },
      {
        formItemType: 'switch',
        label: '状态',
        field: 'status',
        initialValue: true,
        triggerPropName: 'checked',
      },
    ],
  };

  const [EditorForm, editorFormRef] = useForm<Topic>(editorFormConfig);
  const [formInstance] = Form.useForm<OperateTopicOption>();

  const handleOpenModal = (mode: number, data?: Topic) => {
    setVisible(true);
    setMode(mode);

    if (data) {
      setCurrentItem(data);
      editorFormRef.setFieldsValue(data);
      formInstance.setFieldsValue(data);
    } else {
      setCurrentItem(null);
      editorFormRef.resetFields();
      formInstance.resetFields();
    }
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleCreateOrUpdate = async () => {
    if (editorFormRef) {
      try {
        const res = await editorFormRef.validate();

        const optionRes = await formInstance.validate();

        console.log(res, optionRes);

        await fetchOperate(mode, { ...res, ...optionRes });
      } catch (_) {
        console.log(editorFormRef.getFieldsError());
        // Message.error('校验失败，请检查字段！');
      }
    }
  };

  const handleDelete = async (data: Topic) => {
    setCurrentItem(data);

    await fetchOperate(3, data);
  };

  const fetchOperate = async (mode: number, data: Topic) => {
    const params = {
      ...data,
      id: currentItem?.id ?? data.id,
      evaluationId: Number(evaluatinoId),
    };

    let api,
      msg = '';

    switch (mode) {
      case 1:
        api = topic.createTopic;
        msg = '新增成功';
        break;
      case 2:
        api = topic.updateTopic;
        msg = '更新成功';
        break;
      case 3:
        api = topic.deleteTopic;
        msg = '删除成功';
        break;
      default:
        api = topic.createTopic;
        break;
    }

    try {
      const { code } = await api(params);

      if (code === ResultEnum.SUCCESS) {
        void fetchData();

        handleCloseModal();

        editorFormRef.clearFields();

        Message.success(msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className='container'>
      <PageHeader
        title='评测详情'
        breadcrumb={{
          routes: [
            {
              path: 'evaluation',
              breadcrumbName: '评测',
            },
            {
              path: 'evaluation/list',
              breadcrumbName: '评测列表',
            },
            {
              path: 'evaluation/detail',
              breadcrumbName: '评测详情',
            },
          ],
        }}
      />
      <Card>
        <Descriptions
          border
          title='基础信息'
          size='large'
          layout='horizontal'
          data={detailDesc}
          style={{ marginBottom: 20 }}
          column={{
            xs: 1,
            sm: 2,
            md: 2,
            lg: 2,
            xl: 3,
            xxl: 4,
          }}
        />
      </Card>
      <section className='mt-4'>
        <Card
          title='题目管理'
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
            // pagination={{ total, showTotal: true, showJumper: true, sizeCanChange: true }}
            pagePosition='bottomCenter'
            rowKey='id'
            // onChange={handleTableChange}
          />
        </Card>
      </section>
      <Modal
        title={(mode === 1 ? '新增' : '编辑') + '题目'}
        visible={visible}
        autoFocus={false}
        focusLock={true}
        mountOnEnter={false}
        className='custom-modal'
        onOk={handleCreateOrUpdate}
        onCancel={handleCloseModal}
      >
        <EditorForm />
        <Form
          form={formInstance}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          autoComplete='off'
          initialValues={{
            topicOptionList: [
              {
                name: '',
                // id:
                // score: null,
              },
            ],
          }}
          onValuesChange={(_, v) => {
            console.log(_, v);
          }}
        >
          <Form.List field='topicOptionList'>
            {(fields, { add, remove, move }) => {
              return (
                <div>
                  {fields.map((item, index) => {
                    return (
                      <div key={item.key}>
                        <Form.Item label={'选项 ' + (index + 1)}>
                          <Space>
                            <Form.Item field={item.field + '.name'} rules={[{ required: true }]} noStyle>
                              <Input placeholder='请输入选项名' />
                            </Form.Item>
                            <Form.Item field={item.field + '.score'} noStyle>
                              <InputNumber placeholder='请输入选项计分' />
                            </Form.Item>
                            <Button
                              icon={<div className='r-ph-anchor-simple-thin' />}
                              shape='circle'
                              status='danger'
                              onClick={() => remove(index)}
                            ></Button>
                          </Space>
                        </Form.Item>
                      </div>
                    );
                  })}
                  <Form.Item wrapperCol={{ offset: 6 }}>
                    <Button
                      onClick={() => {
                        add();
                      }}
                    >
                      添加选项
                    </Button>
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>
        </Form>
      </Modal>
    </section>
  );
};

export default EvaluationDetail;
