import './index.scss';

import type { PaginationProps, TableColumnProps } from '@arco-design/web-react';
import { Card, PageHeader, Table, Tag } from '@arco-design/web-react';
import type { SorterInfo } from '@arco-design/web-react/es/Table/interface';

import { manager } from '@/api';
import type { Manager, ManagerRecord as ManagerRecordModal } from '@/api/manager/interface';
import { RequestEnum, ResultEnum } from '@/enums';

const ManagerRecord = () => {
  const columns: TableColumnProps<ManagerRecordModal>[] = [
    {
      title: 'ID',
      width: 80,
      dataIndex: 'id',
      sorter: {
        compare: (a: Manager, b: Manager) => a.id - b.id,
      },
    },
    {
      title: '请求地址',
      width: 240,
      dataIndex: 'request',
    },
    {
      title: '请求结果',
      width: 180,
      dataIndex: 'result',
    },
    {
      title: '请求方式',
      width: 180,
      dataIndex: 'method',
      render: (col) => (
        <>
          {col === RequestEnum.DELETE && <Tag color='red'>DELETE</Tag>}
          {col === RequestEnum.GET && <Tag color='orangered'>GET</Tag>}
          {col === RequestEnum.POST && <Tag color='orangered'>POST</Tag>}
          {col === RequestEnum.PUT && <Tag color='orangered'>PUT</Tag>}
        </>
      ),
    },
    {
      title: '请求参数',
      width: 180,
      dataIndex: 'params',
    },
    {
      title: '时间',
      width: 240,
      dataIndex: 'createTime',
    },
  ];

  // const navigate = useNavigate();

  // const jumpToDetail = (id: number) => {
  //   navigate(`/manager/detail/${id}`);
  // };

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<ManagerRecordModal[]>([]);
  const [total, setTotal] = useState<number>(0);
  // const [filter, setFilter] = useState<ManagerFilter | null>(null);

  useEffect(() => {
    void fetchData(page, limit);
  }, [page, limit]);

  // const handleReset = () => {
  //   searchFormRef.resetFields();
  // };

  // const handleSearch = async () => {
  //   if (searchFormRef) {
  //     try {
  //       const res = await searchFormRef.validate();

  //       // setFilter(res);
  //       setPage(1);
  //     } catch (_) {
  //       console.log(searchFormRef.getFieldsError());
  //       // Message.error('校验失败，请检查字段！');
  //     }
  //   }
  // };

  // const searchFormConfig: FormConfig = {
  //   layout: 'inline',
  //   autoComplete: 'off',
  //   // initialValues: {
  //   //   name: '',
  //   //   mobile: '',
  //   //   gender: [1, 2],
  //   //   type: [1, 2],
  //   //   status: [0, 1],
  //   // },
  //   formItems: [
  //     {
  //       component: 'input',
  //       formItemProps: { label: '管理员名称', field: 'username' },
  //       componentProps: {
  //         placeholder: '请输入管理员名称',
  //         allowClear: true,
  //       },
  //     },
  //     {
  //       component: 'input',
  //       formItemProps: { label: '手机号', field: 'mobile' },
  //       componentProps: { placeholder: '请输入手机号', allowClear: true },
  //     },
  //     {
  //       component: 'checkbox',
  //       formItemProps: { label: '性别', field: 'gender', initialValue: [1, 2] },
  //       componentProps: {
  //         options: [
  //           { label: '男', value: 1 },
  //           { label: '女', value: 2 },
  //         ],
  //       },
  //     },
  //     {
  //       component: 'checkbox',
  //       formItemProps: { label: '类型', field: 'type', initialValue: [1, 2] },
  //       componentProps: {
  //         options: [
  //           { label: '高级', value: 1 },
  //           { label: '普通', value: 2 },
  //         ],
  //       },
  //     },
  //     {
  //       component: 'checkbox',
  //       formItemProps: { label: '状态', field: 'status', initialValue: [1, 0] },
  //       componentProps: {
  //         options: [
  //           { label: '启用', value: 1 },
  //           { label: '禁用', value: 0 },
  //         ],
  //       },
  //     },
  //   ],
  //   formButtons: [
  //     {
  //       name: '重置',
  //       htmlType: 'reset',
  //       icon: <div className='i-material-symbols:device-reset'></div>,
  //       onClick: handleReset,
  //     },
  //     {
  //       name: '查询',
  //       htmlType: 'button',
  //       type: 'primary',
  //       icon: <div className='i-material-symbols:search'></div>,
  //       onClick: handleSearch,
  //     },
  //   ],
  // };

  // const [SearchForm, searchFormRef] = useForm<ManagerFilter>(searchFormConfig);

  // const reloadData = () => {
  //   if (page === 1) {
  //     void fetchData(page, limit);
  //   } else {
  //     setPage(1);
  //   }
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

    const params = {
      page,
      limit,
    };

    //  (params = { ...params, ...filter });

    try {
      const { code, result } = await manager.getManagerRecord(params);

      if (code === ResultEnum.SUCCESS) {
        setList(result.list);
        setTotal(result.total);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className='container'>
      <PageHeader
        title='管理员操作记录'
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
            {
              path: 'manager/record',
              breadcrumbName: '管理员操作记录',
            },
          ],
        }}
      />
      <section className='mt-4'>
        <Card title='操作记录' bordered={false} headerStyle={{ textAlign: 'left' }}>
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
    </section>
  );
};

export default ManagerRecord;
