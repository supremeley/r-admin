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
  Tooltip,
} from '@arco-design/web-react';
import type { SorterInfo } from '@arco-design/web-react/es/Table/interface';

import { manager } from '@/api';
import type { Manager, ManagerFilter, OperateManagerResult } from '@/api/manager/interface';
import { Gender, ManagerType } from '@/enums';
import { ResultEnum } from '@/enums/http';
import { useForm } from '@/hooks';
import type { FormConfig } from '@/hooks/useForm/interface';

const Row = Grid.Row;
const Col = Grid.Col;

const ManagerList = () => {
  const columns: TableColumnProps<Manager>[] = [
    {
      title: 'ID',
      width: 120,
      dataIndex: 'id',
      sorter: {
        compare: (a: Manager, b: Manager) => a.id - b.id,
      },
    },
    {
      title: '名称',
      width: 180,
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
          {col === Gender.Male && <div className='r-material-symbols:female text-8' />}
          {col === Gender.Female && <div className='r-material-symbols:male text-8' />}
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
          {col === ManagerType.System && <div>高级管理员</div>}
          {col === ManagerType.General && <div>普通管理员</div>}
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
              <Button
                type='primary'
                shape='circle'
                icon={<div className='r-ph-anchor-simple-thin' />}
                onClick={() => jumpToDetail(item.id)}
              ></Button>
            </Tooltip>
          </Col>
          <Col span={6}>
            <Tooltip content='操作记录'>
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

  const navigate = useNavigate();

  const jumpToDetail = (id: number) => {
    navigate(`/manager/detail/${id}`);
  };

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<Manager[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [filter, setFilter] = useState<ManagerFilter | null>(null);

  useEffect(() => {
    console.log('useEffect');
    void fetchData(page, limit);
  }, [page, limit, filter]);

  const handleReset = () => {
    searchFormRef.resetFields();
  };

  const handleSearch = async () => {
    console.log(searchFormRef);
    if (searchFormRef) {
      try {
        const res = await searchFormRef.validate();
        console.log(res);

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
        formItemType: 'input',
        label: '管理员名称',
        field: 'username',
        placeholder: '请输入管理员名称',
        allowClear: true,
      },
      {
        formItemType: 'input',
        label: '手机号',
        field: 'mobile',
        placeholder: '请输入手机号',
        allowClear: true,
      },
      {
        formItemType: 'checkbox',
        label: '性别',
        field: 'gender',
        initialValue: [1, 2],
        options: [
          { label: '男', value: 1 },
          { label: '女', value: 2 },
        ],
      },
      {
        formItemType: 'checkbox',
        label: '类型',
        field: 'type',
        initialValue: [1, 2],
        options: [
          { label: '高级', value: 1 },
          { label: '普通', value: 2 },
        ],
      },
      {
        formItemType: 'checkbox',
        label: '状态',
        field: 'status',
        initialValue: [1, 0],
        options: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 },
        ],
      },
    ],
    formButtons: [
      {
        name: '重置',
        htmlType: 'reset',
        icon: <div className='r-ph-anchor-simple-thin' />,
        onClick: handleReset,
      },
      {
        name: '查询',
        htmlType: 'button',
        type: 'primary',
        icon: <div className='r-ph-anchor-simple-thin' />,
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

    await fetchOperate(2, item);
  };

  const handleTableChange = (pagination: PaginationProps, sorter: SorterInfo | SorterInfo[]) => {
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
  const [mode, setMode] = useState(1);

  const editorFormConfig: FormConfig = {
    autoComplete: 'off',
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
    formItems: [
      {
        formItemType: 'uploadPhoto',
        label: '上传头像',
        field: 'avatar',
      },
      {
        formItemType: 'input',
        label: '管理员名称',
        field: 'username',
        placeholder: '请输入管理员名称',
        rules: [{ required: true, message: '请输入管理员名称' }],
      },
      {
        formItemType: 'inputNumber',
        label: '手机号',
        field: 'mobile',
        placeholder: '请输入手机号',
        rules: [{ required: true, message: '请输入手机号' }],
      },
      {
        formItemType: 'radio',
        label: '性别',
        field: 'gender',
        initialValue: 1,
        options: [
          { label: '男', value: 1 },
          { label: '女', value: 2 },
        ],
      },
      {
        formItemType: 'radio',
        label: '类型',
        field: 'type',
        initialValue: 1,
        options: [
          { label: '高级管理员', value: 1 },
          { label: '普通管理员', value: 2 },
        ],
      },
      {
        formItemType: 'switch',
        label: '状态',
        field: 'status',
        initialValue: true,
        triggerPropName: 'checked',
      },
      {
        formItemType: 'textarea',
        label: '说明',
        field: 'describe',
        autoSize: { minRows: 2 },
      },
      {
        formItemType: 'textarea',
        label: '备注',
        field: 'remark',
        autoSize: { minRows: 2 },
      },
    ],
  };

  const [EditorForm, editorFormRef] = useForm<Manager>(editorFormConfig);

  const handleOpenModal = (mode: number, data?: Manager) => {
    setVisible(true);
    setMode(mode);

    if (data) {
      setCurrentItem(data);
      editorFormRef.setFieldsValue(data);
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

        await fetchOperate(mode, res);
      } catch (_) {
        console.log(editorFormRef.getFieldsError());
        // Message.error('校验失败，请检查字段！');
      }
    }
  };

  const handleDelete = async (data: Manager) => {
    // setCurrentItem(data);

    await fetchOperate(3, data);
  };

  const fetchOperate = async (mode: number, data: Manager) => {
    let params: OperateManagerResult = {
      ...data,
      id: data.id ?? currentItem?.id,
    };

    let api,
      msg = '';

    switch (mode) {
      case 1:
        api = manager.createManager;
        msg = '新增成功';
        break;
      case 2:
        api = manager.updateManager;
        msg = '更新成功';
        break;
      case 3:
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
              path: 'list',
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
              icon={<div className='r-ph-anchor-simple-thin' />}
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
            pagination={{ total, showTotal: true, showJumper: true, sizeCanChange: true }}
            pagePosition='bottomCenter'
            rowKey='id'
            onChange={handleTableChange}
          />
        </Card>
      </section>
      <Modal
        title={(mode === 1 ? '新增' : '编辑') + '管理员'}
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
