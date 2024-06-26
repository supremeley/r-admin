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
  // Switch,
  Table,
  Tooltip,
} from '@arco-design/web-react';
import type { SorterInfo } from '@arco-design/web-react/es/Table/interface';
import dayjs from 'dayjs';

import { user } from '@/api';
import type { User, UserFilter } from '@/api/user/interface';
import { GenderEnum, OperateModeEnum, ResultEnum } from '@/enums';
import { useForm } from '@/hooks';
import type { FormConfig } from '@/hooks/useForm/interface';

import type { UserTableModel } from '../interface';

const { Row, Col } = Grid;

const UserList = () => {
  const columns: TableColumnProps<UserTableModel>[] = [
    {
      title: 'ID',
      width: 80,
      dataIndex: 'id',
      sorter: {
        compare: (a: UserTableModel, b: UserTableModel) => a.id - b.id,
      },
    },
    {
      title: '名称',
      width: 120,
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
        compare: (a: UserTableModel, b: UserTableModel) => a.mobile - b.mobile,
      },
    },
    {
      title: '性别',
      width: 120,
      dataIndex: 'gender',
      sorter: {
        compare: (a: UserTableModel, b: UserTableModel) => a.gender - b.gender,
      },
      render: (col) => (
        <>
          {col === GenderEnum.Male && <div className='i-material-symbols:female text-8 color-blue' />}
          {col === GenderEnum.Female && <div className='i-material-symbols:male text-8 color-red' />}
        </>
      ),
    },
    {
      title: '年龄',
      width: 120,
      dataIndex: 'age',
      sorter: {
        compare: (a: UserTableModel, b: UserTableModel) => (a.age ?? 0) - (b.age ?? 0),
      },
    },
    // {
    //   title: '状态',
    //   width: 120,
    //   dataIndex: 'status',
    //   sorter: {
    //     compare: (a: UserTableModel) => (a.status ? 1 : -1),
    //   },
    //   render: (col, item) => (
    //     <Switch
    //       checked={col}
    //       checkedIcon={<div className='i-material-symbols:check'></div>}
    //       onChange={() => handleSwitchStatus(item)}
    //     />
    //   ),
    // },
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
            <Tooltip content='评测记录'>
              <Button
                type='primary'
                shape='circle'
                icon={<div className='i-material-symbols:deployed-code-history-outline'></div>}
                onClick={() => jumpToExam(item.id)}
              ></Button>
            </Tooltip>
          </Col>
          {/* <Col span={6}>
            <Tooltip content='教学记录'>
              <Button
                type='primary'
                shape='circle'
                icon={<div className='i-material-symbols:deployed-code-history-outline'></div>}
                onClick={() => jumpToExam(item.id)}
              ></Button>
            </Tooltip>
          </Col> */}
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

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<UserTableModel[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [filter, setFilter] = useState<UserFilter | null>(null);

  useEffect(() => {
    void fetchData(page, limit);
  }, [page, limit, filter]);

  const handleReset = () => {
    searchFormRef?.resetFields();
  };

  const handleSearch = async () => {
    if (searchFormRef) {
      try {
        const res = await searchFormRef.validate();
        setFilter(res);
        // setPage(1);
      } catch (_) {
        console.log(searchFormRef.getFieldsError());
        // Message.error('校验失败，请检查字段！');
      }
    }
  };

  const navigate = useNavigate();

  const jumpToDetail = (id: number) => {
    navigate(`/user/detail/${id}`);
  };

  const jumpToExam = (id: number) => {
    navigate(`/user/exam/${id}`);
  };

  const searchFormConfig: FormConfig = {
    layout: 'inline',
    autoComplete: 'off',
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
    formItems: [
      {
        component: 'input',
        formItemProps: {
          label: '用户名称',
          field: 'username',
        },
        componentProps: { placeholder: '请输入用户名称', allowClear: true },
      },
      {
        component: 'inputNumber',
        formItemProps: { label: '手机号', field: 'mobile' },
        componentProps: { placeholder: '请输入手机号' },
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

  const [SearchForm, searchFormRef] = useForm<UserFilter>(searchFormConfig);

  const reloadData = () => {
    if (page === 1) {
      void fetchData(page, limit);
    } else {
      setPage(1);
    }
  };

  // const handleSwitchStatus = async (item: User) => {
  //   item.status = !item.status;
  //   // setCurrentItem(item);

  //   await fetchOperate(OperateModeEnum.Update, item);
  // };

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
      const { code, result } = await user.getUserList(params);

      if (code === ResultEnum.SUCCESS) {
        const list: UserTableModel[] = result.list.map((item) => {
          return {
            ...item,
            age: item.birthday ? dayjs().diff(dayjs(item.birthday), 'year') + 1 : null,
          };
        });

        setList(list);
        setTotal(result.total);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [visible, setVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState<User | null>(null);
  const [mode, setMode] = useState<OperateModeEnum>(OperateModeEnum.Create);

  const editorFormConfig: FormConfig = {
    autoComplete: 'off',
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
    formItems: [
      {
        component: 'input',
        formItemProps: { label: '名用户称', field: 'username', rules: [{ required: true, message: '请输入用户名称' }] },
        componentProps: { placeholder: '请输入用户名称' },
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
        component: 'datePicker',
        formItemProps: { label: '生日', field: 'birthday' },
        componentProps: { format: 'YYYY-MM-DD HH:mm:ss' },
      },
      {
        component: 'switch',
        formItemProps: { label: '是否开启', field: 'status', initialValue: true, triggerPropName: 'checked' },
      },
    ],
  };

  const [EditorForm, editorFormRef] = useForm<User>(editorFormConfig);

  const handleOpenModal = (mode: OperateModeEnum, data?: User) => {
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

  const handleDelete = async (data: User) => {
    setCurrentItem(data);

    await fetchOperate(OperateModeEnum.Delete, data);
  };

  const fetchOperate = async (mode: OperateModeEnum, data: User) => {
    const params = {
      ...data,
      id: currentItem?.id ?? data.id,
    };

    let api,
      msg = '';

    switch (mode) {
      case OperateModeEnum.Create:
        api = user.createUser;
        msg = '新增成功';
        break;
      case OperateModeEnum.Update:
        api = user.updateUser;
        msg = '更新成功';
        break;
      case OperateModeEnum.Delete:
        api = user.deleteUser;
        msg = '删除成功';
        break;
      default:
        api = user.createUser;
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
        title='用户管理'
        breadcrumb={{
          routes: [
            {
              path: 'user',
              breadcrumbName: '用户',
            },
            {
              path: 'user/list',
              breadcrumbName: '用户管理',
            },
          ],
        }}
      />
      <Card>
        <SearchForm />
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
              icon={<div className='i-material-symbols:add'></div>}
              style={{ width: '100%' }}
              onClick={() => handleOpenModal(1)}
            >
              新增
            </Button>
          }
        >
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
        </Card>
      </section>
      <Modal
        title={(mode === OperateModeEnum.Create ? '新增' : '编辑') + '用户'}
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

export default UserList;
