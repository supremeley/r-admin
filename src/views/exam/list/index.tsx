import './index.scss';

import type { PaginationProps, TableColumnProps } from '@arco-design/web-react';
import { Button, Card, Grid, PageHeader, Table, Tooltip } from '@arco-design/web-react';
// import type { SorterInfo } from '@arco-design/web-react/es/Table/interface';
import dayjs from 'dayjs';

import { exam, file } from '@/api';
import type { ExamFilter } from '@/api/exam/interface';
import { evaluationTagMap, evaluationTypeMap } from '@/constants';
import { EvaluationTagEnum, EvaluationTypeEnum, ResultEnum } from '@/enums';
import { useForm } from '@/hooks';
import type { FormConfig } from '@/hooks/useForm/interface';

import type { ExamTableModel } from '../interface';

const { Row, Col } = Grid;

const ExamList = () => {
  const columns: TableColumnProps<ExamTableModel>[] = [
    {
      title: '评测名称',
      width: 180,
      dataIndex: 'evaluationName',
    },
    {
      title: '评测日期',
      width: 180,
      dataIndex: 'createTime',
      // sorter: {
      //   compare: (a: ExamTableModel, b: ExamTableModel) => a.createTime - b.createTime,
      // },
    },
    {
      title: '评测类型',
      width: 120,
      dataIndex: 'evaluationTypeText',
    },
    // {
    //   title: '说明',
    //   width: 240,
    //   dataIndex: 'describe',
    // },
    // {
    //   title: '备注',
    //   width: 240,
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
            <Tooltip content='详情'>
              <Button
                type='primary'
                shape='circle'
                icon={<div className='i-material-symbols:list-alt-outline-rounded'></div>}
                onClick={() => jumpToDetail(item.id)}
              ></Button>
            </Tooltip>
          </Col>
          <Col span={12}>
            <Tooltip content='导出'>
              <Button
                type='primary'
                shape='circle'
                icon={<div className='i-material-symbols:cloud-download'></div>}
                onClick={() => handleExport(item)}
              ></Button>
            </Tooltip>
          </Col>
          {/* <Col span={6}>
            <Tooltip content='记录'>
              <Button type='primary' shape='circle' icon={<div class="i-material-symbols:add"></div>}></Button>
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
                  icon={<div class="i-material-symbols:add"></div>}
                ></Button>
              </Tooltip>
            </Popconfirm>
          </Col> */}
        </Row>
      ),
    },
  ];

  const { id: userId } = useParams();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<ExamTableModel[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [filter, setFilter] = useState<ExamFilter | null>(null);

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
    navigate(`/exam/detail/${id}`);
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
          label: '评测名称',
          field: 'name',
        },
        componentProps: { placeholder: '请输入评测名称', allowClear: true },
      },
      {
        component: 'datePicker',
        formItemProps: { label: '填写时间', field: 'time' },
        componentProps: { format: 'YYYY-MM-DD HH:mm:ss' },
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

  const [SearchForm, searchFormRef] = useForm<ExamFilter>(searchFormConfig);

  // const reloadData = () => {
  //   if (page === 1) {
  //     void fetchData(page, limit);
  //   } else {
  //     setPage(1);
  //   }
  // };

  // const handleSwitchStatus = async (item: User) => {
  //   item.status = !item.status;
  //   // setCurrentItem(item);

  //   await fetchOperate(2, item);
  // };

  const handleTableChange = (pagination: PaginationProps) => {
    // TODO: 后端做排序
    // console.log(pagination, sorter);
    const { current, pageSize } = pagination;

    if (current !== page || pageSize !== limit) {
      setPage(current ?? 1);
      setLimit(pageSize ?? 10);
    }
  };

  const fetchData = async (page: number, limit: number) => {
    setLoading(true);

    const params = {
      userId,
      page,
      limit,
    };

    // filter && (params = { ...params, ...filter });

    try {
      const { code, result } = await exam.getExamRecord(params);

      if (code === ResultEnum.SUCCESS) {
        // const { list, total } = result;
        const list: ExamTableModel[] = result.list.map((item) => {
          const evaluationTypeText: string =
            item.evaluation.type === EvaluationTypeEnum.BuiltIn
              ? evaluationTypeMap[item.evaluation.type]
              : evaluationTagMap[item.evaluation.tag];

          return {
            evaluationTypeText,
            id: item.id,
            evaluationName: item.evaluation.name,
            createTime: item.createTime,
            evaluation: item.evaluation,
            // describe: '',
            // remark: '',
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

  // const [visible, setVisible] = useState(false);
  // const [currentItem, setCurrentItem] = useState<User | null>(null);
  // const [mode, setMode] = useState(1);

  // const editorFormConfig: FormConfig = {
  //   autoComplete: 'off',
  //   labelCol: { span: 6 },
  //   wrapperCol: { span: 18 },
  //   formItems: [
  //     {
  //       component: 'input',
  //       formItemProps: { label: '名用户称', field: 'username', rules: [{ required: true, message: '请输入用户名称' }] },
  //       componentProps: { placeholder: '请输入用户名称' },
  //     },
  //     {
  //       component: 'inputNumber',
  //       formItemProps: { label: '手机号', field: 'mobile', rules: [{ required: true, message: '请输入手机号' }] },
  //       componentProps: { placeholder: '请输入手机号' },
  //     },
  //     {
  //       component: 'radio',
  //       formItemProps: { label: '性别', field: 'gender', initialValue: 1 },
  //       componentProps: {
  //         options: [
  //           { label: '男', value: 1 },
  //           { label: '女', value: 2 },
  //         ],
  //       },
  //     },
  //     {
  //       component: 'datePicker',
  //       formItemProps: { label: '生日', field: 'birthday' },
  //       componentProps: { format: 'YYYY-MM-DD HH:mm:ss' },
  //     },
  //     {
  //       component: 'switch',
  //       formItemProps: { label: '是否开启', field: 'status', initialValue: true, triggerPropName: 'checked' },
  //     },
  //   ],
  // };

  // const [EditorForm, editorFormRef] = useForm<User>(editorFormConfig);

  // const handleOpenModal = (mode: number, data?: User) => {
  //   setVisible(true);
  //   setMode(mode);

  //   if (data) {
  //     setCurrentItem(data);
  //     editorFormRef.setFieldsValue(data);
  //   } else {
  //     setCurrentItem(null);
  //     editorFormRef.resetFields();
  //   }
  // };

  // const handleCloseModal = () => {
  //   setVisible(false);
  // };

  // const handleCreateOrUpdate = async () => {
  //   if (editorFormRef) {
  //     try {
  //       const res = await editorFormRef.validate();

  //       await fetchOperate(mode, res);
  //     } catch (_) {
  //       console.log(editorFormRef.getFieldsError());
  //       // Message.error('校验失败，请检查字段！');
  //     }
  //   }
  // };

  // const handleDelete = async (data: User) => {
  //   setCurrentItem(data);

  //   await fetchOperate(3, data);
  // };

  // const fetchOperate = async (mode: number, data: User) => {
  // const params = {
  //   ...data,
  //   id: currentItem?.id ?? data.id,
  // };
  // let api,
  //   msg = '';
  // switch (mode) {
  //   case 1:
  //     api = user.createUser;
  //     msg = '新增成功';
  //     break;
  //   case 2:
  //     api = user.updateUser;
  //     msg = '更新成功';
  //     break;
  //   case 3:
  //     api = user.deleteUser;
  //     msg = '删除成功';
  //     break;
  //   default:
  //     api = user.createUser;
  //     break;
  // }
  // try {
  //   const { code } = await api(params);
  //   if (code === ResultEnum.SUCCESS) {
  //     reloadData();
  //     handleCloseModal();
  //     editorFormRef.clearFields();
  //     Message.success(msg);
  //   }
  // } catch (error) {
  //   console.log(error);
  // }
  // };

  const handleExport = async (item: ExamTableModel) => {
    const {
      id,
      evaluation: { name, tag },
    } = item;

    const data = await file.fileDownload({ id, userId: +userId!, tag });

    let start = '';
    let suffix = '.xlsx';

    switch (tag) {
      case EvaluationTagEnum.Develop:
        start = '职业发展诊断';
        suffix = '.pptx';
        break;
      case EvaluationTagEnum.Motivation:
        start = '职业动机测评';
        break;
      case EvaluationTagEnum.Interest:
        start = '职业兴趣测评';
        break;
      case EvaluationTagEnum.Type:
        start = '职业类型测评';
        break;
      case EvaluationTagEnum.Develop:
        start = 'MBTI';
        break;
      default:
        start = name;
        break;
    }

    const filename = start + dayjs().format('YYYY-MM-DD') + suffix;
    const a = document.createElement('a');
    const url = window.URL.createObjectURL(data);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <section className='container'>
      <PageHeader
        title='评测记录'
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
            {
              path: 'exam/list',
              breadcrumbName: '评测记录',
            },
          ],
        }}
      />
      <Card>
        <SearchForm />
      </Card>
      <section className='mt-4'>
        <Card title='评测记录' bordered={false} headerStyle={{ textAlign: 'left' }}>
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
      {/* <Modal
        title={(mode === 1 ? '新增' : '编辑') + '用户'}
        visible={visible}
        autoFocus={false}
        focusLock={true}
        mountOnEnter={false}
        onOk={handleCreateOrUpdate}
        onCancel={handleCloseModal}
      >
        <EditorForm />
      </Modal> */}
    </section>
  );
};

export default ExamList;
