import './index.scss';

import type { PaginationProps, TableColumnProps } from '@arco-design/web-react';
import {
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
import qs from 'qs';

import { evaluation } from '@/api';
import type { Evaluation, EvaluationFilter, EvaluationListParams } from '@/api/evaluation/interface';
import { OperateModeEnum, ResultEnum } from '@/enums';
import { useForm } from '@/hooks';
import type { FormConfig } from '@/hooks/useForm/interface';

const Row = Grid.Row;
const Col = Grid.Col;

const EvaluationList = () => {
  const columns: TableColumnProps<Evaluation>[] = [
    {
      title: 'ID',
      width: 120,
      dataIndex: 'id',
      sorter: {
        compare: (a: Evaluation, b: Evaluation) => a.id - b.id,
      },
    },
    {
      title: '名称',
      width: 240,
      dataIndex: 'name',
    },
    {
      title: '状态',
      width: 120,
      dataIndex: 'status',
      sorter: {
        compare: (a: Evaluation) => (a.status ? 1 : -1),
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
                icon={<div className='i-material-symbols:edit-document-outline-sharp'></div>}
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
            <Tooltip content='记录'>
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

  const parseLocation = (key: string) => {
    if (location.search) {
      const query = qs.parse(location.search.substring(1));
      return query[key] ?? 0;
    }

    return 0;
  };

  const location = useLocation();
  const [type, setType] = useState(Number(parseLocation('type')));

  useEffect(() => {
    if (type !== Number(parseLocation('type'))) {
      setType(Number(parseLocation('type')));
    }
  }, [location]);

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<Evaluation[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [filter, setFilter] = useState<EvaluationFilter | null>(null);

  useEffect(() => {
    void fetchData(page, limit);
  }, [page, limit, filter, type]);

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
    navigate(`/evaluation/detail/${id}`);
  };

  const jumpToRecord = (id: number) => {
    navigate(`/exam/record/${id}`);
  };

  const searchFormConfig: FormConfig = {
    layout: 'inline',
    autoComplete: 'off',
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
    formItems: [
      {
        component: 'input',
        formItemProps: { label: '评测名称', field: 'name' },
        componentProps: {
          placeholder: '请输入评测名称',
          allowClear: true,
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

  const [SearchForm, searchFormRef] = useForm<EvaluationFilter>(searchFormConfig);

  const reloadData = () => {
    if (page === 1) {
      void fetchData(page, limit);
    } else {
      setPage(1);
    }
  };

  const handleSwitchStatus = async (item: Evaluation) => {
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

    const params: EvaluationListParams = {
      page,
      limit,
    };

    Object.assign(params, { ...filter }, { type: type ?? 0 });

    try {
      const { code, result } = await evaluation.getEvaluationList(params);

      if (code === ResultEnum.SUCCESS) {
        setList(result.list);
        setTotal(result.total);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const [visible, setVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState<Evaluation | null>(null);
  const [mode, setMode] = useState(1);

  const editorFormConfig: FormConfig = {
    autoComplete: 'off',
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
    formItems: [
      {
        component: 'input',
        formItemProps: {
          label: '评测名称',
          field: 'name',
          rules: [{ required: true, message: '请输入名称' }],
        },
        componentProps: {
          placeholder: '请输入评测名称',
        },
      },
      {
        component: 'radio',
        formItemProps: { label: '模式', field: 'mode', initialValue: 1 },
        componentProps: {
          options: [
            { label: '普通', value: 1 },
            { label: '翻页', value: 2 },
          ],
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
        component: 'switch',
        formItemProps: { label: '是否启用', field: 'status', initialValue: true, triggerPropName: 'checked' },
      },
      {
        component: 'input',
        formItemProps: { label: '备注', field: 'remark' },
      },
    ],
  };

  const [EditorForm, editorFormRef] = useForm<Evaluation>(editorFormConfig);

  const handleOpenModal = (mode: number, data?: Evaluation) => {
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

  const handleDelete = async (data: Evaluation) => {
    setCurrentItem(data);

    await fetchOperate(OperateModeEnum.Delete, data);
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
        params.type = type ? Number(type) : 0;
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
        title='评测列表'
        breadcrumb={{
          routes: [
            {
              path: 'evaluation',
              breadcrumbName: '评测',
            },
            {
              path: 'evaluation/list',
              breadcrumbName: '评测管理',
            },
          ],
        }}
      />
      <Card>
        <SearchForm />
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
        title={(mode === 1 ? '新增' : '编辑') + '评测'}
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

export default EvaluationList;
