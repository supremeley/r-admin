import './index.scss';

import type { PaginationProps, TableColumnProps } from '@arco-design/web-react';
import {
  Avatar,
  Button,
  Card,
  Grid,
  Message,
  Modal,
  PageHeader,
  Popconfirm,
  Switch,
  Table,
  Tag,
  Tooltip,
} from '@arco-design/web-react';
import type { SorterInfo } from '@arco-design/web-react/es/Table/interface';

import { manager } from '@/api';
import type { EditorManager, Manager, ManagerFilter, OperateManagerResult } from '@/api/manager/interface';
import { GenderEnum, ManagerTypeEnum, OperateModeEnum, ResultEnum } from '@/enums';
import { useForm } from '@/hooks';
import type { FormConfig } from '@/hooks/useForm/interface';

const Row = Grid.Row;
const Col = Grid.Col;

const ManagerList = () => {
  const columns: TableColumnProps<Manager>[] = [
    {
      title: 'ID',
      width: 80,
      dataIndex: 'id',
      sorter: {
        compare: (a: Manager, b: Manager) => a.id - b.id,
      },
    },
    {
      title: '名称',
      width: 240,
      dataIndex: 'username',
    },
    {
      title: '头像',
      width: 120,
      dataIndex: 'avatar',
      render: (col) => (
        <Avatar className='hover' size={40}>
          <img src={col} />
        </Avatar>
      ),
    },
    {
      title: '手机号',
      width: 180,
      dataIndex: 'mobile',
      sorter: {
        compare: (a: Manager, b: Manager) => a.mobile - b.mobile,
      },
    },
    {
      title: '性别',
      width: 120,
      dataIndex: 'gender',
      sorter: {
        compare: (a: Manager, b: Manager) => a.gender - b.gender,
      },
      render: (col) => (
        <>
          {col === GenderEnum.Male && <div className='i-material-symbols:female text-8 color-blue' />}
          {col === GenderEnum.Female && <div className='i-material-symbols:male text-8 color-red' />}
        </>
      ),
    },
    {
      title: '类型',
      width: 180,
      dataIndex: 'type',
      sorter: {
        compare: (a: Manager, b: Manager) => a.type - b.type,
      },
      render: (col) => (
        <>
          {col === ManagerTypeEnum.System && <Tag color='red'>高级管理员</Tag>}
          {col === ManagerTypeEnum.General && <Tag color='orangered'>普通管理员</Tag>}
        </>
      ),
    },
    {
      title: '状态',
      width: 120,
      dataIndex: 'status',
      sorter: {
        compare: (a: Manager) => (a.status ? 1 : -1),
      },
      render: (col, item) => (
        <Switch
          checked={col}
          checkedIcon={<div className='i-material-symbols:check'></div>}
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
                icon={<div className='i-material-symbols:patient-list-rounded'></div>}
                onClick={() => handleOpenModal(2, item)}
              ></Button>
            </Tooltip>
          </Col>
          <Col span={6}>
            <Tooltip content='详情'>
              <Button
                type='primary'
                shape='circle'
                icon={<div className='i-material-symbols:list-alt-outline-rounded'></div>}
                onClick={() => jumpToDetail(item.id)}
              ></Button>
            </Tooltip>
          </Col>
          <Col span={6}>
            <Tooltip content='操作记录'>
              <Button
                type='primary'
                shape='circle'
                icon={<div className='i-material-symbols:deployed-code-history-outline'></div>}
                onClick={() => jumpToRecord(item.id)}
              ></Button>
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
                  icon={<div className='i-material-symbols:delete-rounded'></div>}
                ></Button>
              </Tooltip>
            </Popconfirm>
          </Col>
        </Row>
      ),
    },
  ];

  const navigate = useNavigate();

  const jumpToDetail = (id: number) => {
    navigate(`/manager/detail/${id}`);
  };

  const jumpToRecord = (id: number) => {
    navigate(`/manager/record/${id}`);
  };

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<Manager[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [filter, setFilter] = useState<ManagerFilter | null>(null);

  useEffect(() => {
    void fetchData(page, limit);
  }, [page, limit, filter]);

  const handleReset = () => {
    searchFormRef.resetFields();
  };

  const handleSearch = async () => {
    if (searchFormRef) {
      try {
        const res = await searchFormRef.validate();

        setFilter(res);
        setPage(1);
      } catch (_) {
        console.log(searchFormRef.getFieldsError());
        // Message.error('校验失败，请检查字段！');
      }
    }
  };

  const searchFormConfig: FormConfig = {
    layout: 'inline',
    autoComplete: 'off',
    // initialValues: {
    //   name: '',
    //   mobile: '',
    //   gender: [1, 2],
    //   type: [1, 2],
    //   status: [0, 1],
    // },
    formItems: [
      {
        component: 'input',
        formItemProps: { label: '管理员名称', field: 'username' },
        componentProps: {
          placeholder: '请输入管理员名称',
          allowClear: true,
        },
      },
      {
        component: 'input',
        formItemProps: { label: '手机号', field: 'mobile' },
        componentProps: { placeholder: '请输入手机号', allowClear: true },
      },
      {
        component: 'checkbox',
        formItemProps: { label: '性别', field: 'gender', initialValue: [1, 2] },
        componentProps: {
          options: [
            { label: '男', value: 1 },
            { label: '女', value: 2 },
          ],
        },
      },
      {
        component: 'checkbox',
        formItemProps: { label: '类型', field: 'type', initialValue: [1, 2] },
        componentProps: {
          options: [
            { label: '高级', value: 1 },
            { label: '普通', value: 2 },
          ],
        },
      },
      {
        component: 'checkbox',
        formItemProps: { label: '状态', field: 'status', initialValue: [1, 0] },
        componentProps: {
          options: [
            { label: '启用', value: 1 },
            { label: '禁用', value: 0 },
          ],
        },
      },
    ],
    formButtons: [
      {
        name: '重置',
        htmlType: 'reset',
        icon: <div className='i-material-symbols:device-reset'></div>,
        onClick: handleReset,
      },
      {
        name: '查询',
        htmlType: 'button',
        type: 'primary',
        icon: <div className='i-material-symbols:search'></div>,
        onClick: handleSearch,
      },
    ],
  };

  const [SearchForm, searchFormRef] = useForm<ManagerFilter>(searchFormConfig);

  const reloadData = () => {
    if (page === 1) {
      void fetchData(page, limit);
    } else {
      setPage(1);
    }
  };

  const handleSwitchStatus = async (item: Manager) => {
    item.status = !item.status;
    // setCurrentItem(item);

    await fetchOperate(OperateModeEnum.Update, item);
  };

  const handleTableChange = (pagination: PaginationProps, sorter: SorterInfo | SorterInfo[]) => {
    // TODO: 后端做排序
    console.log(pagination, sorter);

    const { current, pageSize } = pagination;

    if (current !== page || pageSize !== limit) {
      setPage(current ?? 1);
      setLimit(pageSize ?? 10);
    }
  };

  const fetchData = async (page: number, limit: number) => {
    setLoading(true);

    let params = {
      page,
      limit,
    };

    filter && (params = { ...params, ...filter });

    try {
      const { code, result } = await manager.getManagerList(params);

      if (code === ResultEnum.SUCCESS) {
        setList(result.list);
        setTotal(result.total);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [visible, setVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState<Manager | null>(null);
  const [mode, setMode] = useState<OperateModeEnum>(OperateModeEnum.Create);

  const editorFormConfig: FormConfig = {
    autoComplete: 'off',
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
    formItems: [
      {
        component: 'uploadPhoto',
        formItemProps: { label: '上传头像', field: 'avatar', triggerPropName: 'fileList' },
        componentProps: { listType: 'picture-card', accept: '.jpg, .jpeg, .png', limit: 1 },
      },
      {
        component: 'input',
        formItemProps: {
          label: '管理员名称',
          field: 'username',
          rules: [{ required: true, message: '请输入管理员名称' }],
        },
        componentProps: { placeholder: '请输入管理员名称' },
      },
      {
        component: 'inputNumber',
        formItemProps: { label: '手机号', field: 'mobile', rules: [{ required: true, message: '请输入手机号' }] },
        componentProps: { placeholder: '请输入手机号' },
      },
      {
        component: 'radio',
        formItemProps: { label: '性别', field: 'gender', initialValue: 1 },
        componentProps: {
          options: [
            { label: '男', value: 1 },
            { label: '女', value: 2 },
          ],
        },
      },
      {
        component: 'radio',
        formItemProps: { label: '类型', field: 'type', initialValue: 1 },
        componentProps: {
          options: [
            { label: '高级管理员', value: 1 },
            { label: '普通管理员', value: 2 },
          ],
        },
      },
      {
        component: 'switch',
        formItemProps: { label: '是否开启', field: 'status', initialValue: true, triggerPropName: 'checked' },
      },
      {
        component: 'textarea',
        formItemProps: { label: '说明', field: 'describe' },
        componentProps: { autoSize: { minRows: 2 } },
      },
      {
        component: 'textarea',
        formItemProps: { label: '备注', field: 'remark' },
        componentProps: { autoSize: { minRows: 2 } },
      },
    ],
  };

  const [EditorForm, editorFormRef] = useForm<EditorManager>(editorFormConfig);

  const handleOpenModal = (mode: OperateModeEnum, data?: Manager) => {
    setVisible(true);
    setMode(mode);

    if (data) {
      setCurrentItem(data);

      editorFormRef.setFieldsValue({
        ...data,
        avatar: data.avatar ? [{ uid: '-1', url: data.avatar, name: data.avatar }] : undefined,
      });
    } else {
      setCurrentItem(null);
      editorFormRef.resetFields();
    }
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleCreateOrUpdate = async () => {
    if (editorFormRef) {
      try {
        const res = await editorFormRef.validate();

        const avatar = res.avatar ? (res.avatar.at(-1)?.response as UploadFileResult)?.url : '';

        const params = { ...res, avatar };

        await fetchOperate(mode, params);
      } catch (_) {
        console.log(editorFormRef.getFieldsError());
        // Message.error('校验失败，请检查字段！');
      }
    }
  };

  const handleDelete = async (data: Manager) => {
    // setCurrentItem(data);

    await fetchOperate(OperateModeEnum.Delete, data);
  };

  const fetchOperate = async (mode: OperateModeEnum, data: Manager) => {
    let params: OperateManagerResult = {
      ...data,
      id: data.id ?? currentItem?.id,
      // avatar: data.avatar,
    };

    let api,
      msg = '';

    switch (mode) {
      case OperateModeEnum.Create:
        api = manager.createManager;
        msg = '新增成功';
        break;
      case OperateModeEnum.Update:
        api = manager.updateManager;
        msg = '更新成功';
        break;
      case OperateModeEnum.Delete:
        api = manager.deleteManager;
        params = { id: data.id };
        msg = '删除成功';
        break;
      default:
        api = manager.createManager;
        break;
    }

    try {
      const { code } = await api(params);

      if (code === ResultEnum.SUCCESS) {
        reloadData();

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
        title='管理员列表'
        breadcrumb={{
          routes: [
            {
              path: 'manager',
              breadcrumbName: '管理员',
            },
            {
              path: 'manager/list',
              breadcrumbName: '管理员列表',
            },
          ],
        }}
      />
      <Card>
        <SearchForm />
      </Card>
      <section className='mt-4'>
        <Card
          title='管理员列表'
          bordered={false}
          headerStyle={{ textAlign: 'left' }}
          extra={
            <Button
              type='primary'
              htmlType='button'
              icon={<div className='i-material-symbols:add'></div>}
              style={{ width: '100%' }}
              onClick={() => handleOpenModal(1)}
            >
              新增
            </Button>
          }
        >
          <Table
            tableLayoutFixed
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
        </Card>
      </section>
      <Modal
        title={(mode === OperateModeEnum.Create ? '新增' : '编辑') + '管理员'}
        visible={visible}
        autoFocus={false}
        focusLock={true}
        mountOnEnter={false}
        onOk={handleCreateOrUpdate}
        onCancel={handleCloseModal}
      >
        <EditorForm />
      </Modal>
    </section>
  );
};

export default ManagerList;
