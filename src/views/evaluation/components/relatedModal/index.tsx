import type { PaginationProps, TableColumnProps } from '@arco-design/web-react';
import { Modal, Table, Tag } from '@arco-design/web-react';
import type { SorterInfo } from '@arco-design/web-react/es/Table/interface';

import { topic } from '@/api';
import type { Topic } from '@/api/topic/interface';
import { ResultEnum, TopicTypeEnum } from '@/enums';

interface RelatedModalProps {
  visible: boolean;
  evaluationId: number;
  selectedRowKeys: number[];
  handleOk: () => void;
  handleClose: () => void;
  handleSelectedRowKeys: (selectedRowKeys: number[]) => void;
}

const RelatedModal = ({
  visible,
  evaluationId,
  selectedRowKeys,
  handleOk,
  handleClose,
  handleSelectedRowKeys,
}: RelatedModalProps) => {
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
      title: '题目组',
      width: 360,
      dataIndex: 'topicGroup.name',
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
      title: '说明',
      width: 200,
      dataIndex: 'describe',
    },
  ];

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const [list, setList] = useState<Topic[]>([]);

  useEffect(() => {
    void fetchData(page, limit);
  }, [page, limit]);

  useEffect(() => {
    visible && reloadData();
  }, [visible]);

  const handleTableChange = (pagination: PaginationProps, sorter: SorterInfo | SorterInfo[]) => {
    // TODO: 后端做排序
    console.log(pagination, sorter);

    const { current, pageSize } = pagination;

    if (current !== page || pageSize !== limit) {
      setPage(current ?? 1);
      setLimit(pageSize ?? 10);
    }
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
      evaluationId,
    };

    try {
      const { code, result } = await topic.getTopicList(params);

      if (code === ResultEnum.SUCCESS) {
        setList(result.list);
        setTotal(result.total);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title='关联题目'
      visible={visible}
      autoFocus={false}
      focusLock={true}
      mountOnEnter={false}
      className='custom-modal'
      onOk={handleOk}
      onCancel={handleClose}
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
        rowSelection={{
          selectedRowKeys,
          type: 'checkbox',
          fixed: true,
          checkCrossPage: true,
          onChange: (selectedRowKeys, selectedRows) => {
            console.log('onChange:', selectedRowKeys, selectedRows);
            handleSelectedRowKeys(selectedRowKeys as number[]);
          },
          onSelect: (selected, record, selectedRows) => {
            console.log('onSelect:', selected, record, selectedRows);
          },
        }}
        onChange={handleTableChange}
      />
    </Modal>
  );
};

export default RelatedModal;
