import './index.scss';

import type { FormInstance, PaginationProps, TableColumnProps } from '@arco-design/web-react';
import {
  Button,
  Card,
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
  Tabs,
  Tag,
  Tooltip,
} from '@arco-design/web-react';
import type { SorterInfo } from '@arco-design/web-react/es/Table/interface';

import { topic } from '@/api';
import type {
  OperateGroup,
  OperateTopic,
  OperateTopicWithOption,
  Topic,
  // TopicFilter,
  TopicGroup,
  TopicGroupWithTopic,
  TopicWithOption,
} from '@/api/topic/interface';
import { OperateModeEnum, ResultEnum, TopicTypeEnum } from '@/enums';
import { useForm } from '@/hooks';
import type { FormConfig } from '@/hooks/useForm/interface';

import RelatedModal from '../components/relatedModal';

const Row = Grid.Row;
const Col = Grid.Col;
const TabPane = Tabs.TabPane;

enum TabEnum {
  Topic = 'topic',
  Group = 'group',
}

const EvaluationDetail = () => {
  const columns: TableColumnProps<Topic>[] = [
    {
      title: '序号',
      width: 80,
      dataIndex: 'sortNo',
      sorter: {
        compare: (a: Topic, b: Topic) => a.sortNo - b.sortNo,
      },
    },
    {
      title: '题目',
      width: 360,
      dataIndex: 'name',
    },
    {
      title: '类型',
      width: 120,
      dataIndex: 'type',
      sorter: {
        compare: (a: Topic, b: Topic) => a.type - b.type,
      },
      render: (col) => (
        <>
          {col === TopicTypeEnum.Radio && <Tag color='red'>单选</Tag>}
          {col === TopicTypeEnum.Checkbox && <Tag color='blue'>多选</Tag>}
          {col === TopicTypeEnum.Input && <Tag color='orange'>问答</Tag>}
          {col === TopicTypeEnum.Sort && <Tag color='green'>排序</Tag>}
          {col === TopicTypeEnum.Score && <Tag color='lime'>打分</Tag>}
        </>
      ),
    },
    {
      title: '题目组',
      width: 320,
      dataIndex: 'topicGroup.name',
    },
    {
      title: '说明',
      width: 200,
      dataIndex: 'describe',
    },
    // {
    //   title: '状态',
    //   width: 120,
    //   dataIndex: 'status',
    //   sorter: {
    //     compare: (a: Topic) => (a.status ? 1 : -1),
    //   },
    //   render: (col, item) => (
    //     <Switch
    //       checked={col}
    //       checkedIcon={<div className='r-material-symbols:check'></div>}
    //       onChange={() => handleSwitchStatus(item)}
    //     />
    //   ),
    // },
    // {
    //   title: '备注',
    //   width: 280,
    //   dataIndex: 'remark',
    // },
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
                icon={<div className='i-material-symbols:edit-document-outline-sharp'></div>}
                onClick={() => handleOpenModal(OperateModeEnum.Update, item)}
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
                  icon={<div className='i-material-symbols:delete-rounded'></div>}
                ></Button>
              </Tooltip>
            </Popconfirm>
          </Col>
        </Row>
      ),
    },
  ];

  const groupColumns: TableColumnProps<TopicGroupWithTopic>[] = [
    {
      title: '序号',
      width: 80,
      dataIndex: 'sortNo',
      sorter: {
        compare: (a: Topic, b: Topic) => a.sortNo - b.sortNo,
      },
    },
    {
      title: '题目组',
      width: 360,
      dataIndex: 'name',
    },
    {
      title: '题目组说明',
      width: 200,
      dataIndex: 'describe',
    },
    // {
    //   title: '状态',
    //   width: 120,
    //   dataIndex: 'status',
    //   sorter: {
    //     compare: (a: Topic) => (a.status ? 1 : -1),
    //   },
    //   render: (col, item) => (
    //     <Switch
    //       checked={col}
    //       checkedIcon={<div className='r-material-symbols:check'></div>}
    //       onChange={() => handleSwitchStatus(item)}
    //     />
    //   ),
    // },
    // {
    //   title: '备注',
    //   width: 280,
    //   dataIndex: 'remark',
    // },
    {
      title: '操作',
      width: 160,
      fixed: 'right',
      dataIndex: 'operation',
      render: (_, item) => (
        <Row gutter={6}>
          <Col span={8}>
            <Tooltip content='编辑'>
              <Button
                type='primary'
                shape='circle'
                icon={<div className='i-material-symbols:edit-document-outline-sharp'></div>}
                onClick={() => handleOpenModal(OperateModeEnum.Update, item)}
              ></Button>
            </Tooltip>
          </Col>
          <Col span={8}>
            <Tooltip content='关联'>
              <Button
                type='primary'
                shape='circle'
                icon={<div className='i-material-symbols:edit-document-outline-sharp'></div>}
                onClick={() => handleOpenRelatedModal(item)}
              ></Button>
            </Tooltip>
          </Col>
          <Col span={8}>
            <Popconfirm
              focusLock
              title='警告'
              content='请确认是否删除?'
              onOk={() => handleGroupDelete(item)}
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
                  icon={<div className='i-material-symbols:delete-rounded'></div>}
                ></Button>
              </Tooltip>
            </Popconfirm>
          </Col>
        </Row>
      ),
    },
  ];

  const { id: evaluationId } = useParams();

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const [list, setList] = useState<Topic[]>([]);
  const [groupList, setGroupList] = useState<TopicGroup[]>([]);
  // const [filter, setFilter] = useState<TopicFilter | null>(null);
  const [currentTab, setCurrentTab] = useState(TabEnum.Topic);

  useEffect(() => {
    void fetchData(page, limit);
  }, [page, limit]);

  useEffect(() => {
    reloadData();
  }, [currentTab]);

  const handleTableChange = (pagination: PaginationProps, sorter: SorterInfo | SorterInfo[]) => {
    // TODO: 后端做排序
    console.log(pagination, sorter);

    const { current, pageSize } = pagination;

    if (current !== page || pageSize !== limit) {
      setPage(current ?? 1);
      setLimit(pageSize ?? 10);
    }
  };

  const handleTabChange = (tabPage: string) => {
    setCurrentTab(tabPage as TabEnum);
  };

  const reloadData = () => {
    if (page === 1) {
      void fetchData(page, limit);
    } else {
      setPage(1);
    }
  };

  const fetchData = async (page: number, limit: number) => {
    setLoading(true);

    const params = {
      page,
      limit,
      evaluationId: +evaluationId!,
    };

    try {
      if (currentTab === TabEnum.Topic) {
        const { code, result } = await topic.getTopicList(params);

        if (code === ResultEnum.SUCCESS) {
          setList(result.list);
          setTotal(result.total);
        }
      }

      if (currentTab === TabEnum.Group) {
        const { code, result } = await topic.getTopicGroupList(params);

        if (code === ResultEnum.SUCCESS) {
          setGroupList(result.list);
          setTotal(result.total);
        }
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<OperateModeEnum>(OperateModeEnum.Create);
  const [currentItem, setCurrentItem] = useState<TopicWithOption | null>(null);
  const [currentGroup, setCurrentGroup] = useState<TopicGroup | null>(null);

  const editorFormConfig: FormConfig = {
    autoComplete: 'off',
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
    formItems: [
      {
        component: 'textarea',
        formItemProps: {
          label: '题目',
          field: 'name',
          // rules: [{ required: true, message: '请输入题目' }],
        },
        componentProps: {
          placeholder: '请输入题目',
        },
      },
      {
        component: 'switch',
        formItemProps: { label: '是否启用', field: 'status', initialValue: true, triggerPropName: 'checked' },
      },
      {
        component: 'switch',
        formItemProps: {
          label: '是否必填',
          field: 'required',
          triggerPropName: 'checked',
          initialValue: true,
        },
      },
      {
        component: 'inputNumber',
        formItemProps: {
          label: '序号',
          field: 'sortNo',
          initialValue: list.length + 1,
        },
        componentProps: {
          placeholder: '请输入题目序号',
        },
      },
      {
        component: 'textarea',
        formItemProps: {
          label: '说明',
          field: 'describe',
        },
        componentProps: {
          rows: 3,
        },
      },
      {
        component: 'radio',
        formItemProps: {
          label: '题目类型',
          field: 'type',
          initialValue: 1,
        },
        componentProps: {
          options: [
            { label: '单选题', value: TopicTypeEnum.Radio },
            { label: '多选题', value: TopicTypeEnum.Checkbox },
            { label: '问答题', value: TopicTypeEnum.Input },
            { label: '排序题', value: TopicTypeEnum.Sort },
            { label: '打分题', value: TopicTypeEnum.Score },
          ],
        },
      },
      {
        component: 'inputNumber',
        formItemProps: {
          label: '文本填写最大长度',
          field: 'maxLength',
          initialValue: 100,
        },
        watch: {
          field: 'maxLength',
          depend: 'type',
          condition: (value) => {
            return value === 3;
          },
        },
      },
      {
        component: 'inputNumber',
        formItemProps: {
          label: '最小分值',
          field: 'rangeMin',
          initialValue: 1,
        },
        watch: {
          field: 'rangeMin',
          depend: 'type',
          condition: (value) => {
            return value === 5;
          },
        },
      },
      {
        component: 'inputNumber',
        formItemProps: {
          label: '最大分值',
          field: 'rangeMax',
          initialValue: 10,
        },
        watch: {
          field: 'rangeMax',
          depend: 'type',
          condition: (value) => {
            return value === 5;
          },
        },
      },
      // {
      //   component: 'group',
      //   formItemProps: {
      //     label: '分值区间',
      //   },
      //   childrenItems: [
      //     {
      //       component: 'inputNumber',
      //       formItemProps: {
      //         field: 'rangeMin',
      //       },
      //     },
      //     {
      //       component: 'inputNumber',
      //       formItemProps: {
      //         field: 'rangeMax',
      //       },
      //     },
      //   ],
      // },
      {
        component: 'switch',
        formItemProps: {
          label: '是否需要补充',
          field: 'inputted',
          triggerPropName: 'checked',
          initialValue: false,
        },
      },
      {
        component: 'textarea',
        formItemProps: {
          label: '补充提问',
          field: 'inputtedTopic',
          initialValue: '',
        },
      },
      {
        component: 'textarea',
        formItemProps: {
          label: '补充提问条件',
          field: 'inputtedCondition',
          initialValue: '',
        },
        componentProps: {
          placeholder: '示例：>= 5, 符号与数字间请保留空格',
        },
      },
    ],
  };

  const [EditorForm, editorFormInstance] = useForm<OperateTopic>(editorFormConfig);
  const [formInstance] = Form.useForm();
  const type = Form.useWatch('type', editorFormInstance as FormInstance) || {};

  const handleOpenModal = (mode: number, data?: Topic | TopicGroup) => {
    setVisible(true);
    setMode(mode);

    if (currentTab === TabEnum.Topic) {
      if (data) {
        setCurrentItem(data as Topic);
        editorFormInstance.setFieldsValue(data);
        formInstance.setFieldsValue(data);
      } else {
        setCurrentItem(null);
        editorFormInstance.resetFields();
        formInstance.resetFields();
      }
    }

    if (currentTab === TabEnum.Group) {
      if (data) {
        setCurrentGroup(data as TopicGroup);
        editorGroupFormInstance.setFieldsValue(data);
      } else {
        setCurrentGroup(null);
        editorGroupFormInstance.resetFields();
      }
    }
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleCreateOrUpdate = async () => {
    let instance: FormInstance = editorFormInstance as FormInstance;

    if (currentTab === TabEnum.Group) {
      instance = editorGroupFormInstance as FormInstance;
    }

    if (instance) {
      try {
        const res: OperateTopic = await instance.validate();

        if (currentTab === TabEnum.Topic) {
          const optionRes: OperateTopicWithOption = await formInstance.validate();

          console.log(res, optionRes);

          await fetchOperate(mode, { ...res, ...optionRes });
        }

        if (currentTab === TabEnum.Group) {
          await fetchGroupOperate(mode, { ...res });
        }
      } catch (_) {
        console.log(editorFormInstance.getFieldsError());
        // Message.error('校验失败，请检查字段！');
      }
    }
  };

  const handleDelete = async (data: Topic) => {
    setCurrentItem(data);

    await fetchOperate(OperateModeEnum.Delete, data);
  };

  const fetchOperate = async (mode: OperateModeEnum, data: OperateTopicWithOption) => {
    const params = {
      ...data,
      evaluationId: +evaluationId!,
    };

    if (currentItem?.id ?? data.id) {
      params.id = currentItem?.id ?? data.id;
    }

    let api,
      msg = '';

    switch (mode) {
      case OperateModeEnum.Create:
        api = topic.createTopic;
        msg = '新增成功';
        break;
      case OperateModeEnum.Update:
        api = topic.updateTopic;
        msg = '更新成功';
        break;
      case OperateModeEnum.Delete:
        api = topic.deleteTopic;
        msg = '删除成功';
        break;
      default:
        api = topic.createTopic;
        break;
    }

    try {
      const { code, message } = await api(params);

      if (code === ResultEnum.SUCCESS) {
        // void fetchData();

        reloadData();

        handleCloseModal();

        editorFormInstance.clearFields();

        Message.success(msg);
      } else {
        Message.error(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteOption = async (key: number, callback: () => void) => {
    const id = currentItem?.topicOptionList?.[key]?.id;

    if (!id) {
      callback && callback();

      return;
    }

    const params = { id };

    try {
      const { code } = await topic.deleteTopicOption(params);

      if (code === ResultEnum.SUCCESS) {
        // void fetchData();
        reloadData();

        const current = currentItem;

        current.topicOptionList?.splice(key, 1);

        setCurrentItem(current);

        callback && callback();

        Message.success('删除成功');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // TODO: topicGroup

  const editorGroupFormConfig: FormConfig = {
    autoComplete: 'off',
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
    formItems: [
      {
        component: 'textarea',
        formItemProps: {
          label: '题目组',
          field: 'name',
          // rules: [{ required: true, message: '请输入题目组' }],
        },
        componentProps: {
          placeholder: '请输入题目组',
        },
      },
      {
        component: 'textarea',
        formItemProps: {
          label: '题目组说明',
          field: 'describe',
        },
        componentProps: {
          rows: 3,
        },
      },
      {
        component: 'switch',
        formItemProps: {
          label: '是否显示题目序号',
          field: 'showTopicIndex',
          initialValue: true,
          triggerPropName: 'checked',
        },
      },
      {
        component: 'switch',
        formItemProps: {
          label: '是否显示题目组序号',
          field: 'showGroupIndex',
          initialValue: true,
          triggerPropName: 'checked',
        },
      },
      {
        component: 'switch',
        formItemProps: {
          label: '是否打乱选项',
          field: 'disorder',
          initialValue: false,
          triggerPropName: 'checked',
        },
      },
      {
        component: 'switch',
        formItemProps: { label: '是否矩阵', field: 'isMatrix', initialValue: false, triggerPropName: 'checked' },
      },
      {
        component: 'switch',
        formItemProps: { label: '是否启用', field: 'status', initialValue: true, triggerPropName: 'checked' },
      },
      {
        component: 'inputNumber',
        formItemProps: {
          label: '题目组序号',
          field: 'sortNo',
          initialValue: list.length + 1,
        },
        componentProps: {
          placeholder: '请输入题目组序号',
        },
      },
    ],
  };

  const [GroupEditorForm, editorGroupFormInstance] = useForm<OperateGroup>(editorGroupFormConfig);

  const handleGroupDelete = async (data: TopicGroup) => {
    setCurrentGroup(data);

    await fetchGroupOperate(OperateModeEnum.Delete, data);
  };

  const fetchGroupOperate = async (mode: OperateModeEnum, data: OperateGroup) => {
    const params = {
      ...data,
      evaluationId: +evaluationId!,
    };

    if (currentGroup?.id ?? data.id) {
      params.id = currentGroup?.id ?? data.id;
    }

    let api,
      msg = '';

    switch (mode) {
      case OperateModeEnum.Create:
        api = topic.createTopicGroup;
        msg = '新增成功';
        break;
      case OperateModeEnum.Update:
        api = topic.updateTopicGroup;
        msg = '更新成功';
        break;
      case OperateModeEnum.Delete:
        api = topic.deleteTopicGroup;
        msg = '删除成功';
        break;
      default:
        api = topic.createTopicGroup;
        break;
    }

    try {
      const { code, message } = await api(params);

      if (code === ResultEnum.SUCCESS) {
        // void fetchData();
        reloadData();

        handleCloseModal();

        editorGroupFormInstance.clearFields();

        Message.success(msg);
      } else {
        Message.warning(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [relatedVisible, setRelatedVisible] = useState(false);

  const handleOpenRelatedModal = (data: TopicGroupWithTopic) => {
    setRelatedVisible(true);

    setCurrentGroup(data);
    console.log(data);
    const topicListIds = data.topicList.map((item) => item.id);

    setSelectedRowKeys(topicListIds);
  };

  const handleCloseRelatedModal = () => {
    setRelatedVisible(false);
  };

  const handleRelated = async () => {
    if (currentGroup) {
      const params = {
        groupId: currentGroup?.id,
        topicList: selectedRowKeys,
      };

      const { code, message } = await topic.relatedTopicWithGroup(params);

      if (code === ResultEnum.SUCCESS) {
        // void fetchData();
        reloadData();

        handleCloseRelatedModal();

        Message.success('关联成功');
      } else {
        Message.error(message);
      }
    }
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

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
      <section className='mt-4'>
        <Card
          title='题目管理'
          bordered={false}
          headerStyle={{ textAlign: 'left' }}
          extra={
            <Button
              type='primary'
              htmlType='button'
              icon={<div className='i-material-symbols:add'></div>}
              style={{ width: '100%' }}
              onClick={() => handleOpenModal(OperateModeEnum.Create)}
            >
              新增
            </Button>
          }
        >
          <Tabs defaultActiveTab={TabEnum.Topic} onChange={handleTabChange} className='mb-4'>
            <TabPane key={TabEnum.Topic} title='题目'>
              <Table
                columns={columns}
                data={list}
                loading={loading}
                scroll={{ x: true }}
                border={{ bodyCell: false }}
                pagination={{
                  total,
                  current: page,
                  pageSize: limit,
                  showTotal: true,
                  showJumper: true,
                  sizeCanChange: true,
                }}
                pagePosition='bottomCenter'
                rowKey='id'
                onChange={handleTableChange}
              />
            </TabPane>
            <TabPane key={TabEnum.Group} title='题目组'>
              <Table
                columns={groupColumns}
                data={groupList}
                loading={loading}
                scroll={{ x: true }}
                border={{ bodyCell: false }}
                pagination={{
                  total,
                  current: page,
                  pageSize: limit,
                  showTotal: true,
                  showJumper: true,
                  sizeCanChange: true,
                }}
                pagePosition='bottomCenter'
                rowKey='id'
              />
            </TabPane>
          </Tabs>
        </Card>
      </section>
      <Modal
        title={(mode === OperateModeEnum.Create ? '新增' : '编辑') + '题目'}
        visible={visible}
        autoFocus={false}
        focusLock={true}
        mountOnEnter={false}
        className='custom-modal'
        onOk={handleCreateOrUpdate}
        onCancel={handleCloseModal}
      >
        {currentTab === TabEnum.Group && <GroupEditorForm />}
        {currentTab === TabEnum.Topic && (
          <>
            <EditorForm />
            {(type == TopicTypeEnum.Radio || type == TopicTypeEnum.Checkbox || type == TopicTypeEnum.Sort) && (
              <Form
                form={formInstance}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                autoComplete='off'
                // initialValues={{
                //   topicOptionList: [
                //     { name: '' },
                //     { name: '' },
                // { name: '符合' },
                // { name: '不符合' },
                // { name: '1' },
                // { name: '2' },
                // { name: '3' },
                // { name: '4' },
                // { name: '5' },
                // { name: '6' },
                // { name: '7' },
                // { name: '从不' },
                // { name: '偶尔' },
                // { name: '有时' },
                // { name: '经常' },
                // { name: '频繁' },
                // { name: '总是' },
                // { name: '几乎不了解' },
                // { name: '很不了解' },
                // { name: '有一点了解' },
                // { name: '比较了解' },
                // { name: '十分了解' },
                // { name: '愿意' },
                // { name: '不愿意' },
                //   ],
                // }}
              >
                <Form.List field='topicOptionList'>
                  {(fields, { add, remove }) => {
                    return (
                      <div>
                        {fields.map((item, index) => {
                          return (
                            <div key={item.key}>
                              <Form.Item label={'选项 ' + (index + 1)}>
                                <Space>
                                  <Form.Item field={item.field + '.id'} hidden>
                                    <Input />
                                  </Form.Item>
                                  <Form.Item field={item.field + '.name'} rules={[{ required: true }]} noStyle>
                                    <Input placeholder='请输入选项名' />
                                  </Form.Item>
                                  <Form.Item field={item.field + '.score'} noStyle>
                                    <InputNumber placeholder='请输入选项计分' />
                                  </Form.Item>
                                  <Tooltip content='补充信息'>
                                    <Form.Item
                                      noStyle
                                      initialValue={false}
                                      field={item.field + '.inputted'}
                                      triggerPropName='checked'
                                    >
                                      <Switch checkedIcon={<div className='i-material-symbols:check'></div>} />
                                    </Form.Item>
                                  </Tooltip>
                                  <Popconfirm
                                    focusLock
                                    title='警告'
                                    content='请确认是否删除?'
                                    onOk={() => handleDeleteOption(index, () => remove(index))}
                                    onCancel={() => {
                                      Message.error({
                                        content: 'cancel',
                                      });
                                    }}
                                  >
                                    <Tooltip content='删除'>
                                      <Button
                                        icon={<div className='i-material-symbols:delete-rounded'></div>}
                                        shape='circle'
                                        status='danger'
                                      ></Button>
                                    </Tooltip>
                                  </Popconfirm>
                                </Space>
                              </Form.Item>
                            </div>
                          );
                        })}
                        <Form.Item wrapperCol={{ offset: 6 }}>
                          <Button
                            icon={<div className='i-material-symbols:add-circle-outline-rounded'></div>}
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
            )}
          </>
        )}
      </Modal>
      <RelatedModal
        visible={relatedVisible}
        evaluationId={+evaluationId!}
        selectedRowKeys={selectedRowKeys}
        handleOk={handleRelated}
        handleClose={handleCloseRelatedModal}
        handleSelectedRowKeys={setSelectedRowKeys}
      />
    </section>
  );
};

export default EvaluationDetail;
